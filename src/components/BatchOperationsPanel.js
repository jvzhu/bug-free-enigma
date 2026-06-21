import React from 'react';
import { decryptData, encryptData } from '../utils/crypto';

function BatchOperationsPanel({
  notes,
  encryptionKey,
  onUpdateNotes,
  onDeleteNotes,
  onClose,
  onNotify,
}) {
  const [selectedIds, setSelectedIds] = React.useState(() => new Set(notes.map((note) => note.id)));
  const [progress, setProgress] = React.useState({ processed: 0, total: 0 });
  const [results, setResults] = React.useState({});
  const [isWorking, setIsWorking] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [showTagEditor, setShowTagEditor] = React.useState(false);
  const [tagInput, setTagInput] = React.useState('');

  React.useEffect(() => {
    setSelectedIds((current) => new Set(Array.from(current).filter((id) => notes.some((note) => note.id === id))));
  }, [notes]);

  const selectedCount = selectedIds.size;

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
    if (!selectedCount) {
      setResults({ general: 'Select at least one note.' });
      return;
    }

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
    onNotify?.(`${mode === 'encrypt' ? 'Encrypted' : 'Decrypted'} ${targets.length} note${targets.length === 1 ? '' : 's'}.`, 'success');
    setIsWorking(false);
  };

  const handleApplyTag = () => {
    const tag = tagInput.trim().replace(/^#/, '');
    if (!selectedCount) {
      setResults({ general: 'Select at least one note.' });
      return;
    }
    if (!tag) {
      setResults({ general: 'Enter a tag to apply.' });
      return;
    }

    const updatedNotes = notes.map((note) => {
      if (!selectedIds.has(note.id)) {
        return note;
      }

      return {
        ...note,
        tags: Array.from(new Set([...(note.tags || []), tag])),
        updatedAt: new Date().toISOString(),
      };
    });

    onUpdateNotes(updatedNotes);
    setResults({ general: `Applied #${tag} to ${selectedCount} note${selectedCount === 1 ? '' : 's'}.` });
    setTagInput('');
    setShowTagEditor(false);
    onNotify?.(`Applied #${tag} to ${selectedCount} note${selectedCount === 1 ? '' : 's'}.`, 'success');
  };

  const handleDeleteSelected = () => {
    if (!selectedCount) {
      setResults({ general: 'Select at least one note.' });
      return;
    }

    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    onDeleteNotes(Array.from(selectedIds));
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
          <button className="btn btn-secondary" type="button" onClick={() => setShowTagEditor((current) => !current)}>
            Tag Selected
          </button>
          <button className={`btn ${showDeleteConfirm ? 'btn-danger-solid' : 'btn-secondary'}`} type="button" onClick={handleDeleteSelected}>
            {showDeleteConfirm ? 'Confirm Delete Selected' : 'Delete Selected'}
          </button>
          {showDeleteConfirm && (
            <button className="btn btn-secondary" type="button" onClick={() => setShowDeleteConfirm(false)}>
              Cancel Delete
            </button>
          )}
        </div>
        {showTagEditor && (
          <div className="inline-tag-editor">
            <input
              type="text"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              placeholder="Enter tag"
            />
            <button className="btn btn-action" type="button" onClick={handleApplyTag}>
              Apply Tag
            </button>
          </div>
        )}
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
