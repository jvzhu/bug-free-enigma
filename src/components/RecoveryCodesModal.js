import React from 'react';
import { useAuthContext } from '../hooks/useAuth';

function RecoveryCodesModal({ onClose }) {
  const { securityConfig, regenerateRecoveryCodes, isLoading, error } = useAuthContext();
  const [password, setPassword] = React.useState('');
  const [localCodes, setLocalCodes] = React.useState(securityConfig?.recoveryCodes || []);

  React.useEffect(() => {
    setLocalCodes(securityConfig?.recoveryCodes || []);
  }, [securityConfig]);

  const copyUnusedCodes = async () => {
    const unusedCodes = localCodes.filter((entry) => !entry.used).map((entry) => entry.code).join('\n');
    try {
      await navigator.clipboard.writeText(unusedCodes);
    } catch (copyError) {
      console.error('Failed to copy recovery codes:', copyError);
    }
  };

  const handleRegenerate = async () => {
    const result = await regenerateRecoveryCodes(password);
    if (result.success) {
      setLocalCodes(result.recoveryCodes || []);
      setPassword('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-box--wide">
        <div className="modal-header">
          <h3>Recovery Codes</h3>
          <button className="btn btn-icon" type="button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="recovery-codes-grid">
          {localCodes.map((entry) => (
            <div key={entry.code} className={`recovery-code-pill${entry.used ? ' recovery-code-pill--used' : ''}`}>
              <span>{entry.code}</span>
              <strong>{entry.used ? 'Used' : 'Unused'}</strong>
            </div>
          ))}
        </div>
        <div className="button-row">
          <button className="btn btn-secondary" type="button" onClick={copyUnusedCodes}>
            Copy Unused Codes
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => window.print()}>
            Print
          </button>
        </div>
        <label className="form-field">
          <span>Confirm current password to regenerate</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <div className="button-row">
          <button className="btn btn-danger-solid" type="button" onClick={handleRegenerate} disabled={isLoading || !password}>
            {isLoading ? 'Regenerating…' : 'Regenerate Codes'}
          </button>
          <button className="btn btn-action" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecoveryCodesModal;
