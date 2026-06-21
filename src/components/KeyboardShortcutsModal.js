import React from 'react';

const SHORTCUTS = [
  ['Ctrl+N', 'New note'],
  ['Ctrl+S', 'Save (notes already auto-save)'],
  ['Ctrl+F', 'Focus search (if available)'],
  ['Escape', 'Close modal or panel'],
  ['Ctrl+E', 'Encrypt/decrypt current note'],
  ['Ctrl+/', 'Show keyboard shortcuts'],
];

function KeyboardShortcutsModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Keyboard Shortcuts</h3>
          <button className="btn btn-icon" type="button" onClick={onClose}>
            ✕
          </button>
        </div>
        <table className="shortcuts-table">
          <tbody>
            {SHORTCUTS.map(([shortcut, description]) => (
              <tr key={shortcut}>
                <td><code>{shortcut}</code></td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-row">
          <button className="btn btn-action" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcutsModal;
