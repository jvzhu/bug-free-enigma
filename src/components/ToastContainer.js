import React from 'react';

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type || 'success'}`}>
          <span>{toast.message}</span>
          <button className="btn btn-icon toast-dismiss" type="button" onClick={() => onDismiss(toast.id)} aria-label="Dismiss" title="Dismiss">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
