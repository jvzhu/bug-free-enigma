import React from 'react';

function SessionWarningModal({ remainingSeconds, onContinue, onLock }) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div className="modal-overlay">
      <div className="modal-box session-warning-modal">
        <h3>Session Expiring Soon</h3>
        <p>Your secure session will lock automatically due to inactivity.</p>
        <div className="session-warning-countdown">
          {minutes}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="button-row">
          <button className="btn btn-action" type="button" onClick={onContinue}>
            Continue Session
          </button>
          <button className="btn btn-secondary" type="button" onClick={onLock}>
            Lock Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SessionWarningModal;
