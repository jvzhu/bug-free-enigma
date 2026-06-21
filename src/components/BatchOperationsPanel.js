import React from 'react';
import { decryptData, encryptData } from '../utils/crypto';

function BatchOperationsPanel({ notes, encryptionKey, onUpdateNotes, onClose }) {
  const [selectedIds, setSelectedIds] = React.useState(() => new Set(notes.map((note) => note.id)));
  const [progress, setProgress] = React.useState({ processed: 0, total: 0 });
  const [results, setResults] = React.useState({});
  const [isWorking, setIsWorking] = React.useState(false);

  const toggleSelection = (noteId) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(noteId)) {
        next.delete(noteId);
      } else {
        next.add(noteId);
      }
      return next;
    });
  };

  const runOperation = async (mode) => {
    if (!encryptionKey) {
      setResults({ general: 'Unlock with your master password first.' });
      return;
    }

    const targets = notes.filter((note) => selectedIds.has(note.id));
    setIsWorking(true);
    setProgress({ processed: 0, total: targets.length });
    const nextResults = {};
    const updatedNotes = [...notes];

    for (let index = 0; index < targets.length; index += 1) {
      const note = targets[index];
      try {
        const noteIndex = updatedNotes.findIndex((entry) => entry.id === note.id);
        if (noteIndex === -1) {
          continue;
        }

        if (mode === 'encrypt') {
          if (updatedNotes[noteIndex].encryptedData) {
            nextResults[note.id] = 'Already encrypted';
          } else {
            const encryptedData = await encryptData(
              JSON.stringify({
                title: note.title || '',
                content: note.content || '',
                tags: Array.isArray(note.tags) ? note.tags : [],
              }),
              encryptionKey
            );
            updatedNotes[noteIndex] = {
              ...updatedNotes[noteIndex],
              title: '',
              content: '',
              encryptedData,
              isEncrypted: true,
              updatedAt: new Date().toISOString(),
            };
            nextResults[note.id] = 'Encrypted';
          }
        } else if (!updatedNotes[noteIndex].encryptedData) {
          nextResults[note.id] = 'Already decrypted';
        } else {
          let decryptedPayload;
          try {
            decryptedPayload = JSON.parse(
              await decryptData(updatedNotes[noteIndex].encryptedData, encryptionKey)
            );
          } catch (error) {
            throw new Error('Failed to decrypt note: corrupted data or incorrect key.');
          }
          updatedNotes[noteIndex] = {
            ...updatedNotes[noteIndex],
            title: decryptedPayload.title || '',
            content: decryptedPayload.content || '',
            tags: Array.isArray(decryptedPayload.tags) ? decryptedPayload.tags : [],
            encryptedData: null,
            isEncrypted: false,
            updatedAt: new Date().toISOString(),
          };
          nextResults[note.id] = 'Decrypted';
        }
      } catch (error) {
        nextResults[note.id] = error?.message || 'Failed';
      }
      setProgress({ processed: index + 1, total: targets.length });
    }

    setResults(nextResults);
    onUpdateNotes(updatedNotes);
    setIsWorking(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-box--wide batch-operations-panel">
        <div className="modal-header">
          <h3>Batch Operations</h3>
          <button className="btn btn-icon" type="button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="button-row">
          <button className="btn btn-secondary" type="button" onClick={() => setSelectedIds(new Set(notes.map((note) => note.id)))}>
            Select All
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => setSelectedIds(new Set())}>
            Deselect All
          </button>
          <button className="btn btn-action" type="button" onClick={() => runOperation('encrypt')} disabled={isWorking}>
            Encrypt Selected
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => runOperation('decrypt')} disabled={isWorking}>
            Decrypt Selected
          </button>
        </div>
        <div className="progress-row">
          <div className="progress-bar">
            <span
              className="progress-bar-fill"
              style={{ width: `${progress.total ? (progress.processed / progress.total) * 100 : 0}%` }}
            />
          </div>
          <span>{progress.processed}/{progress.total} processed</span>
        </div>
        {results.general && <p className="form-error">{results.general}</p>}
        <ul className="batch-note-list">
          {notes.map((note) => (
            <li key={note.id} className="batch-note-row">
              <label className="checkbox-row checkbox-row--full">
                <input
                  type="checkbox"
                  checked={selectedIds.has(note.id)}
                  onChange={() => toggleSelection(note.id)}
                />
                <span>{note.title || (note.isEncrypted ? '🔒 Encrypted Note' : 'Untitled Note')}</span>
              </label>
              <span className="batch-note-status">{results[note.id] || (note.encryptedData ? 'Encrypted' : 'Plain')}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BatchOperationsPanel;
