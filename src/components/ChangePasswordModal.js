import React from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { useAuthContext } from '../hooks/useAuth';
import { getPasswordStrength } from '../utils/crypto';

function ChangePasswordModal({ onClose, onSuccess, notes = [], onUpdateNotes = () => {} }) {
  const { changePassword, isLoading, error } = useAuthContext();
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [localError, setLocalError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');

    if (newPassword !== confirmPassword) {
      setLocalError('New passwords do not match.');
      return;
    }
    if (getPasswordStrength(newPassword).level < 2) {
      setLocalError('Choose a stronger new password.');
      return;
    }

    const result = await changePassword(currentPassword, newPassword, notes, onUpdateNotes);
    if (result.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onSuccess?.();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Change Master Password</h3>
          <button className="btn btn-icon" type="button" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Current password</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <label className="form-field">
            <span>New password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </label>
          <PasswordStrengthMeter password={newPassword} />
          <label className="form-field">
            <span>Confirm new password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </label>
          {(localError || error) && <p className="form-error">{localError || error}</p>}
          <div className="button-row">
            <button className="btn btn-action" type="submit" disabled={isLoading}>
              {isLoading ? 'Updating…' : 'Update Password'}
            </button>
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
