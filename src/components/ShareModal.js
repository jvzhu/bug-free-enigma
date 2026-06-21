import React, { useMemo, useState } from 'react';
import { generateShareUrl } from '../utils/shareUtils';

async function copyToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  // Legacy fallback for browsers without Clipboard API support.
  const input = document.createElement('textarea');
  input.value = value;
  document.body.appendChild(input);
  input.select();
  // eslint-disable-next-line no-document-execcommand-all -- intentional legacy fallback
  document.execCommand('copy');
  document.body.removeChild(input);
}

function ShareModal({ note, onClose, onCopied }) {
  const [copyError, setCopyError] = useState('');
  const shareUrl = useMemo(() => generateShareUrl(note), [note]);
  const isEncrypted = Boolean(note?.encryptedData);

  const handleCopy = async () => {
    try {
      setCopyError('');
      await copyToClipboard(shareUrl);
      onCopied?.();
    } catch (error) {
      setCopyError(error?.message || 'Unable to copy the share URL.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Share Note</h3>
          <button className="btn btn-icon" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="share-warning">
          {isEncrypted
            ? 'Note content is encrypted, recipient needs the password.'
            : 'This note content will be visible in the URL.'}
        </p>

        <label className="form-field">
          <span>Share URL</span>
          <textarea className="import-textarea" value={shareUrl} readOnly />
        </label>

        {copyError && <p className="form-error">{copyError}</p>}

        <div className="button-row">
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-action" type="button" onClick={handleCopy}>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
