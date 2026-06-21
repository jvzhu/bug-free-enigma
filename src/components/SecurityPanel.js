import React from 'react';
import MasterPasswordSetup from './MasterPasswordSetup';
import RecoveryCodesModal from './RecoveryCodesModal';
import ChangePasswordModal from './ChangePasswordModal';
import BiometricSetup from './BiometricSetup';
import AuditTrailViewer from './AuditTrailViewer';
import { useAuthContext } from '../hooks/useAuth';
import { encryptData } from '../utils/crypto';
import { downloadJson } from '../utils/fileDownload';
import {
  downloadMarkdown,
  exportAllNotesToMarkdown,
  exportNotesToJson,
} from '../utils/exportUtils';

async function prepareEncryptedExport(notes, encryptionKey) {
  return Promise.all(
    notes.map(async (note) => {
      if (note.encryptedData) {
        return note;
      }
      if (!encryptionKey) {
        throw new Error('Unlock with your master password before exporting unencrypted notes.');
      }

      const encryptedData = await encryptData(
        JSON.stringify({
          title: note.title || '',
          content: note.content || '',
          tags: Array.isArray(note.tags) ? note.tags : [],
        }),
        encryptionKey
      );

      return {
        ...note,
        title: '',
        content: '',
        isEncrypted: true,
        encryptedData,
      };
    })
  );
}

function SecurityPanel({ onClose, notes, encryptionKey, onUpdateNotes, onNotify }) {
  const {
    securityConfig,
    isSetupComplete,
    isLoading,
    deriveEncryptionKeyFromPassword,
    logout,
    updatePreferences,
    changeAlgorithm,
    registerBiometricCredential,
    clearBiometricCredential,
    clearAllSecurityData,
  } = useAuthContext();
  const [showRecoveryCodes, setShowRecoveryCodes] = React.useState(false);
  const [showChangePassword, setShowChangePassword] = React.useState(false);
  const [showBiometricSetup, setShowBiometricSetup] = React.useState(false);
  const [showAuditTrail, setShowAuditTrail] = React.useState(false);
  const [showAlgorithmPrompt, setShowAlgorithmPrompt] = React.useState(false);
  const [showClearSecurityPrompt, setShowClearSecurityPrompt] = React.useState(false);
  const [algorithmPassword, setAlgorithmPassword] = React.useState('');
  const [clearSecurityPassword, setClearSecurityPassword] = React.useState('');
  const [pendingAlgorithm, setPendingAlgorithm] = React.useState('');
  const [panelError, setPanelError] = React.useState('');

  const preferences = securityConfig?.preferences || { encryptByDefault: false, sessionTimeoutMinutes: 15 };

  const handleAlgorithmChange = async (event) => {
    const nextAlgorithm = event.target.value;
    if (!securityConfig?.setupComplete) {
      return;
    }
    setPendingAlgorithm(nextAlgorithm);
    setAlgorithmPassword('');
    setShowAlgorithmPrompt(true);
  };

  const handleExportEncrypted = async () => {
    try {
      setPanelError('');
      const payload = await prepareEncryptedExport(notes, encryptionKey);
      downloadJson(`notes-export-${new Date().toISOString()}.json`, payload);
      onNotify?.('Encrypted notes exported.', 'success');
    } catch (exportError) {
      setPanelError(exportError?.message || 'Unable to export encrypted notes.');
    }
  };

  const handleExportPlainJson = () => {
    try {
      setPanelError('');
      exportNotesToJson(notes);
      onNotify?.('Plain JSON export downloaded.', 'success');
    } catch (error) {
      setPanelError(error?.message || 'Unable to export plain JSON notes.');
    }
  };

  const handleExportMarkdown = () => {
    try {
      setPanelError('');
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      downloadMarkdown(`notes-export-${timestamp}.md`, exportAllNotesToMarkdown(notes));
      onNotify?.('Markdown export downloaded.', 'success');
    } catch (error) {
      setPanelError(error?.message || 'Unable to export markdown notes.');
    }
  };

  const handleClearSecurity = () => {
    clearAllSecurityData();
    setShowRecoveryCodes(false);
    setShowChangePassword(false);
    setShowBiometricSetup(false);
    setShowAuditTrail(false);
    onClose?.();
  };

  const confirmAlgorithmChange = async () => {
    const result = await changeAlgorithm(
      algorithmPassword,
      pendingAlgorithm,
      notes,
      onUpdateNotes
    );
    if (!result.success) {
      setPanelError(result.error || 'Unable to change algorithm.');
      return;
    }
    setPanelError('');
    setShowAlgorithmPrompt(false);
    setAlgorithmPassword('');
    setPendingAlgorithm('');
    onNotify?.('Encryption algorithm updated.', 'success');
  };

  const confirmClearSecurity = async () => {
    if (!clearSecurityPassword) {
      setPanelError('Enter your current password to clear security data.');
      return;
    }

    try {
      await deriveEncryptionKeyFromPassword(clearSecurityPassword);
    } catch (error) {
      setPanelError(error?.message || 'Unable to verify your password.');
      return;
    }

    setPanelError('');
    setShowClearSecurityPrompt(false);
    setClearSecurityPassword('');
    handleClearSecurity();
  };

  return (
    <>
      <div className="panel-overlay" onClick={onClose} />
      <aside className="security-panel">
        <div className="security-panel-header">
          <div>
            <h2>Security Settings</h2>
            <p>Manage authentication, encryption, and session controls.</p>
          </div>
          <button className="btn btn-icon" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        {!isSetupComplete ? (
          <MasterPasswordSetup onComplete={onClose} />
        ) : (
          <div className="security-panel-body">
            <section className="security-section">
              <h3>Authentication</h3>
              <p>Setup status: <strong>Protected</strong></p>
              <div className="button-row button-row--stacked">
                <button className="btn btn-action" type="button" onClick={() => setShowChangePassword(true)}>
                  Change Password
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => setShowRecoveryCodes(true)}>
                  View Recovery Codes
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => setShowAuditTrail(true)}>
                  View Audit Trail
                </button>
                <button
                  className="btn btn-biometric"
                  type="button"
                  onClick={() =>
                    securityConfig?.biometricCredentialId
                      ? clearBiometricCredential()
                      : setShowBiometricSetup(true)
                  }
                >
                  {securityConfig?.biometricCredentialId ? 'Disable Biometric Login' : 'Enable Biometric Login'}
                </button>
              </div>
            </section>

            <section className="security-section">
              <h3>Encryption</h3>
              <label className="form-field">
                <span>Algorithm</span>
                <select value={securityConfig?.algorithm || 'AES-GCM-256'} onChange={handleAlgorithmChange}>
                  <option value="AES-GCM-256">AES-GCM-256</option>
                  <option value="AES-GCM-128">AES-GCM-128</option>
                </select>
              </label>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={Boolean(preferences.encryptByDefault)}
                  onChange={(event) => updatePreferences({ encryptByDefault: event.target.checked })}
                />
                <span>Encrypt all new notes by default</span>
              </label>
            </section>

            <section className="security-section">
              <h3>Session</h3>
              <label className="form-field">
                <span>Auto-lock timeout</span>
                <select
                  value={preferences.sessionTimeoutMinutes}
                  onChange={(event) => updatePreferences({ sessionTimeoutMinutes: Number(event.target.value) })}
                >
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </label>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  logout();
                  onClose?.();
                }}
              >
                Lock Now
              </button>
            </section>

            <section className="security-section">
              <h3>Export</h3>
              <div className="button-row button-row--stacked">
                <button className="btn btn-secondary" type="button" onClick={handleExportPlainJson}>
                  Export as JSON (Plain)
                </button>
                <button className="btn btn-secondary" type="button" onClick={handleExportMarkdown}>
                  Export as Markdown
                </button>
                <button className="btn btn-action" type="button" onClick={handleExportEncrypted}>
                  Export Encrypted Notes
                </button>
              </div>
            </section>

            <section className="security-section danger-zone">
              <h3>Danger Zone</h3>
              <p>Remove all stored security settings and audit history.</p>
              <button
                className="btn btn-danger-solid"
                type="button"
                onClick={() => setShowClearSecurityPrompt(true)}
                disabled={isLoading}
              >
                Clear All Security Data
              </button>
            </section>

            {panelError && <p className="form-error">{panelError}</p>}
          </div>
        )}
      </aside>

      {showRecoveryCodes && <RecoveryCodesModal onClose={() => setShowRecoveryCodes(false)} />}
      {showChangePassword && (
        <ChangePasswordModal
          onClose={() => setShowChangePassword(false)}
          onSuccess={() => setShowChangePassword(false)}
          notes={notes}
          onUpdateNotes={onUpdateNotes}
        />
      )}
      {showBiometricSetup && (
        <BiometricSetup
          onSetupComplete={(credentialId) => {
            registerBiometricCredential(credentialId);
            setShowBiometricSetup(false);
          }}
          onCancel={() => setShowBiometricSetup(false)}
        />
      )}
      {showAuditTrail && <AuditTrailViewer onClose={() => setShowAuditTrail(false)} />}
      {showAlgorithmPrompt && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Confirm Algorithm Change</h3>
              <button
                className="btn btn-icon"
                type="button"
                onClick={() => {
                  setShowAlgorithmPrompt(false);
                  setAlgorithmPassword('');
                  setPendingAlgorithm('');
                }}
              >
                ✕
              </button>
            </div>
            <p>Enter your current master password to switch encryption algorithms.</p>
            <label className="form-field">
              <span>Current password</span>
              <input
                type="password"
                value={algorithmPassword}
                onChange={(event) => setAlgorithmPassword(event.target.value)}
                autoComplete="current-password"
              />
            </label>
            <div className="button-row">
              <button
                className="btn btn-action"
                type="button"
                onClick={confirmAlgorithmChange}
                disabled={!algorithmPassword}
              >
                Confirm
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  setShowAlgorithmPrompt(false);
                  setAlgorithmPassword('');
                  setPendingAlgorithm('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showClearSecurityPrompt && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Clear Security Data</h3>
              <button
                className="btn btn-icon"
                type="button"
                onClick={() => {
                  setShowClearSecurityPrompt(false);
                  setClearSecurityPassword('');
                }}
              >
                ✕
              </button>
            </div>
            <p>Enter your current password to confirm. This will remove your security settings, biometrics, and audit history.</p>
            <label className="form-field">
              <span>Current password</span>
              <input
                type="password"
                value={clearSecurityPassword}
                onChange={(event) => setClearSecurityPassword(event.target.value)}
                autoComplete="current-password"
              />
            </label>
            <div className="button-row">
              <button className="btn btn-danger-solid" type="button" onClick={confirmClearSecurity} disabled={!clearSecurityPassword}>
                Clear Security Data
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  setShowClearSecurityPrompt(false);
                  setClearSecurityPassword('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SecurityPanel;
