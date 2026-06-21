import React from 'react';
import { useAuthContext } from '../hooks/useAuth';

function AuthGate({ onAuthenticated }) {
  const {
    isSetupComplete,
    login,
    loginWithRecoveryCode,
    loginWithBiometric,
    isLoading,
    error,
    securityConfig,
  } = useAuthContext();
  const [password, setPassword] = React.useState('');
  const [recoveryCode, setRecoveryCode] = React.useState('');
  const [useRecoveryCode, setUseRecoveryCode] = React.useState(false);
  const [localError, setLocalError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');
    const result = useRecoveryCode
      ? await loginWithRecoveryCode(recoveryCode)
      : await login(password);

    if (result.success) {
      setPassword('');
      setRecoveryCode('');
      onAuthenticated?.();
    }
  };

  const handleBiometric = async () => {
    const result = await loginWithBiometric();
    if (result.success) {
      onAuthenticated?.();
    }
  };

  if (!isSetupComplete) {
    return (
      <div className="auth-gate-overlay">
        <div className="auth-gate-card">
          <div className="auth-gate-logo">🔐</div>
          <h1>Notes App</h1>
          <h2>Setup Required</h2>
          <p>Open Security Settings to configure a master password and unlock encryption features.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-gate-overlay">
      <div className="auth-gate-card">
        <div className="auth-gate-logo">📝</div>
        <h1>Notes App</h1>
        <p>Unlock your secured session to access encrypted notes.</p>
        <form onSubmit={handleSubmit} className="auth-gate-form">
          {useRecoveryCode ? (
            <label className="form-field">
              <span>Recovery code</span>
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX"
                value={recoveryCode}
                onChange={(event) => setRecoveryCode(event.target.value.toUpperCase())}
                required
              />
            </label>
          ) : (
            <label className="form-field">
              <span>Master password</span>
              <input
                type="password"
                placeholder="Enter master password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
          )}
          {(localError || error) && <p className="form-error">{localError || error}</p>}
          <button className="btn btn-action" type="submit" disabled={isLoading}>
            {isLoading ? 'Authenticating…' : useRecoveryCode ? 'Use Recovery Code' : 'Unlock Notes'}
          </button>
        </form>
        {securityConfig?.biometricCredentialId && (
          <button className="btn btn-biometric" type="button" onClick={handleBiometric} disabled={isLoading}>
            Use Fingerprint / Face ID
          </button>
        )}
        <button
          className="btn btn-link"
          type="button"
          onClick={() => {
            setUseRecoveryCode((current) => !current);
            setPassword('');
            setRecoveryCode('');
            setLocalError('');
          }}
        >
          {useRecoveryCode ? 'Use master password instead' : 'Use Recovery Code'}
        </button>
      </div>
    </div>
  );
}

export default AuthGate;
