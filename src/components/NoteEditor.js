import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../hooks/useAuth';

const AUTOSAVE_DELAY = 500;

function NoteEditor({ note, onUpdate, onEncryptNote, onDecryptNote, encryptionKey }) {
  const { securityConfig, deriveEncryptionKeyFromPassword, isSetupComplete } = useAuthContext();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [password, setPassword] = useState('');
  const [actionError, setActionError] = useState('');
  const [isWorking, setIsWorking] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setActionError('');
    setPassword('');
  }, [note.id, note.title, note.content]);

  function flushUpdate(nextTitle, nextContent) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onUpdate(note.id, { title: nextTitle, content: nextContent });
  }

  function scheduleUpdate(newTitle, newContent) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onUpdate(note.id, { title: newTitle, content: newContent });
    }, AUTOSAVE_DELAY);
  }

  function handleTitleChange(e) {
    const value = e.target.value;
    setTitle(value);
    scheduleUpdate(value, content);
  }

  function handleContentChange(e) {
    const value = e.target.value;
    setContent(value);
    scheduleUpdate(title, value);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const lastUpdated = new Date(note.updatedAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const resolveEncryptionKey = async () => {
    if (encryptionKey) {
      return encryptionKey;
    }
    if (!password) {
      throw new Error('Enter your master password to continue.');
    }
    return deriveEncryptionKeyFromPassword(password);
  };

  const handleEncrypt = async () => {
    if (!isSetupComplete) {
      setActionError('Set up security first to encrypt notes.');
      return;
    }

    setIsWorking(true);
    setActionError('');
    try {
      flushUpdate(title, content);
      const key = await resolveEncryptionKey();
      await onEncryptNote(note.id, key);
      setPassword('');
    } catch (error) {
      setActionError(error?.message || 'Unable to encrypt note.');
    } finally {
      setIsWorking(false);
    }
  };

  const handleDecrypt = async () => {
    setIsWorking(true);
    setActionError('');
    try {
      const key = await resolveEncryptionKey();
      await onDecryptNote(note.id, key);
      setPassword('');
    } catch (error) {
      setActionError(error?.message || 'Unable to decrypt note.');
    } finally {
      setIsWorking(false);
    }
  };

  const isLocked = Boolean(note.encryptedData);
  const isEncryptionArmed = note.isEncrypted && !note.encryptedData;

  return (
    <div className="note-editor">
      <div className="note-editor-toolbar">
        <span className={`status-badge${note.isEncrypted ? ' status-badge--encrypted' : ' status-badge--plain'}`}>
          {isLocked ? 'Encrypted' : isEncryptionArmed ? 'Encryption Armed' : 'Plain Text'}
        </span>
        {!isLocked && (
          <button className="btn btn-secondary" type="button" onClick={handleEncrypt} disabled={isWorking}>
            {isWorking ? 'Encrypting…' : 'Encrypt Note'}
          </button>
        )}
      </div>
      <div className="note-editor-meta">Last updated: {lastUpdated}</div>

      {note.tags?.length > 0 && (
        <div className="note-tags note-tags--editor">
          {note.tags.map((tag) => (
            <span key={tag} className="note-tag">#{tag}</span>
          ))}
        </div>
      )}

      {isLocked ? (
        <div className="encrypted-note-state">
          <div className="encrypted-note-icon">🔒</div>
          <h3>This note is encrypted</h3>
          <p>Use your active secure session or enter your master password to decrypt it.</p>
          {!encryptionKey && securityConfig?.setupComplete && (
            <label className="form-field form-field--compact">
              <span>Master password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </label>
          )}
          {actionError && <p className="form-error">{actionError}</p>}
          <button className="btn btn-action" type="button" onClick={handleDecrypt} disabled={isWorking}>
            {isWorking ? 'Decrypting…' : 'Decrypt Note'}
          </button>
        </div>
      ) : (
        <>
          {!encryptionKey && securityConfig?.setupComplete && (
            <label className="form-field form-field--compact">
              <span>Password for encryption</span>
              <input
                type="password"
                placeholder="Enter master password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </label>
          )}
          {actionError && <p className="form-error">{actionError}</p>}
          <input
            className="note-editor-title"
            type="text"
            placeholder="Note title"
            value={title}
            onChange={handleTitleChange}
            maxLength={200}
          />
          <textarea
            className="note-editor-content"
            placeholder="Start writing your note..."
            value={content}
            onChange={handleContentChange}
          />
        </>
      )}
    </div>
  );
}

export default NoteEditor;
