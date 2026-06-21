import React from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { useAuthContext } from '../hooks/useAuth';
import { getPasswordStrength } from '../utils/crypto';

function MasterPasswordSetup({ onComplete }) {
  const { setupMasterPassword, isLoading, error } = useAuthContext();
  const [step, setStep] = React.useState(1);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [localError, setLocalError] = React.useState('');
  const [recoveryCodes, setRecoveryCodes] = React.useState([]);
  const [savedCodes, setSavedCodes] = React.useState(false);

  const combinedError = localError || error;
  const strength = getPasswordStrength(password);

  const handleCreatePassword = async (event) => {
    event.preventDefault();
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    if (strength.level < 2) {
      setLocalError('Choose a stronger master password (minimum: Fair).');
      return;
    }

    const result = await setupMasterPassword(password);
    if (result.success) {
      setRecoveryCodes(result.recoveryCodes || []);
      setPassword('');
      setConfirmPassword('');
      setStep(2);
    }
  };

  const handleCopyAll = async () => {
    const codeText = recoveryCodes.map((entry) => entry.code).join('\n');
    try {
      await navigator.clipboard.writeText(codeText);
    } catch (copyError) {
      console.error('Unable to copy recovery codes:', copyError);
    }
  };

  return (
    <div className="setup-wizard">
      <div className="setup-wizard-steps">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`setup-wizard-step${step >= stepNumber ? ' setup-wizard-step--active' : ''}`}
          >
            {stepNumber}
          </div>
        ))}
      </div>

      {step === 1 && (
        <form className="setup-wizard-panel" onSubmit={handleCreatePassword}>
          <h2>Create Master Password</h2>
          <p>Protect encrypted notes with a strong master password.</p>
          <label className="form-field">
            <span>Master password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </label>
          <PasswordStrengthMeter password={password} />
          <label className="form-field">
            <span>Confirm password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </label>
          {combinedError && <p className="form-error">{combinedError}</p>}
          <button className="btn btn-action" type="submit" disabled={isLoading}>
            {isLoading ? 'Setting up…' : 'Continue'}
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="setup-wizard-panel">
          <h2>Save Recovery Codes</h2>
          <p>Store these one-time codes somewhere safe before continuing.</p>
          <div className="recovery-codes-grid">
            {recoveryCodes.map((entry) => (
              <code key={entry.code} className="recovery-code-pill">
                {entry.code}
              </code>
            ))}
          </div>
          <div className="button-row">
            <button className="btn btn-secondary" type="button" onClick={handleCopyAll}>
              Copy All
            </button>
          </div>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={savedCodes}
              onChange={(event) => setSavedCodes(event.target.checked)}
            />
            <span>I have saved these codes</span>
          </label>
          <button
            className="btn btn-action"
            type="button"
            disabled={!savedCodes}
            onClick={() => setStep(3)}
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="setup-wizard-panel">
          <h2>Setup Complete</h2>
          <ul className="summary-list">
            <li>Master password protection enabled</li>
            <li>Recovery codes generated</li>
            <li>Encrypted note features unlocked</li>
          </ul>
          <button className="btn btn-action" type="button" onClick={onComplete}>
            Start Using Notes
          </button>
        </div>
      )}
    </div>
  );
}

export default MasterPasswordSetup;
