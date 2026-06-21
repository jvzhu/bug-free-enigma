import React, { useState, useRef, useEffect } from 'react';

/**
 * Modal for entering or setting a note password.
 *
 * Props:
 *  mode    – 'unlock' | 'set'
 *  onConfirm(password) – called when user submits
 *  onCancel()          – called when user cancels
 *  error               – optional error string to display
 */
function PasswordModal({ mode, onConfirm, onCancel, error }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const passwordsMatch = password === confirm;
  const canSubmit = password.length > 0 && (mode === 'unlock' || passwordsMatch);

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onConfirm(password);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onCancel();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="modal">
        <h2 className="modal-title">
          {mode === 'set' ? '🔐 Set Note Password' : '🔓 Unlock Note'}
        </h2>

        {mode === 'set' && (
          <p className="modal-description">
            Your note content will be encrypted. <strong>Remember your password — it cannot be recovered.</strong>
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="modal-password">Password</label>
            <input
              id="modal-password"
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>

          {mode === 'set' && (
            <div className="form-field">
              <label htmlFor="modal-confirm">Confirm Password</label>
              <input
                id="modal-confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter password"
                required
                autoComplete="new-password"
              />
              {confirm.length > 0 && !passwordsMatch && (
                <span className="field-error">Passwords do not match</span>
              )}
            </div>
          )}

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
              {mode === 'set' ? 'Encrypt Note' : 'Unlock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;
