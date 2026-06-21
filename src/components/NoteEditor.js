import React, { useState, useEffect, useRef } from 'react';
import PasswordModal from './PasswordModal';
import { encryptContent, decryptContent, isCryptoAvailable } from '../utils/encryption';

const AUTOSAVE_DELAY = 500;

function formatTimestamp(isoString) {
  return new Date(isoString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function parseTags(raw) {
  return raw
    .split(',')
    .map((t) => t.trim().toLowerCase().replace(/\s+/g, '-'))
    .filter(Boolean);
}

function NoteEditor({ note, onUpdate }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.isEncrypted ? '' : note.content);
  const [tagInput, setTagInput] = useState((note.tags || []).join(', '));
  const [isLocked, setIsLocked] = useState(note.isEncrypted);
  const [activePassword, setActivePassword] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('unlock');
  const [modalError, setModalError] = useState('');
  const [cryptoAvailable] = useState(isCryptoAvailable);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);
  function scheduleUpdate(newTitle, newContent, newTags) {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (!mountedRef.current) return;
      const tags = parseTags(newTags !== undefined ? newTags : tagInput);
      if (note.isEncrypted && activePassword) {
        try {
          const encrypted = await encryptContent(newContent, activePassword);
          if (mountedRef.current) {
            onUpdate(note.id, { title: newTitle, tags, ...encrypted });
          }
        } catch (err) {
          console.error('Failed to re-encrypt note on save:', err);
        }
      } else {
        onUpdate(note.id, { title: newTitle, content: newContent, tags });
      }
    }, AUTOSAVE_DELAY);
  }

  function handleTitleChange(e) {
    const value = e.target.value;
    setTitle(value);
    scheduleUpdate(value, content, tagInput);
  }

  function handleContentChange(e) {
    const value = e.target.value;
    setContent(value);
    scheduleUpdate(title, value, tagInput);
  }

  function handleTagInputChange(e) {
    const value = e.target.value;
    setTagInput(value);
    scheduleUpdate(title, content, value);
  }

  // ── Encrypt / Decrypt actions ──────────────────────────────────────────────

  function openEncryptModal() {
    setModalMode('set');
    setModalError('');
    setShowModal(true);
  }

  function openUnlockModal() {
    setModalMode('unlock');
    setModalError('');
    setShowModal(true);
  }

  async function handleModalConfirm(password) {
    if (modalMode === 'confirm') {
      confirmRemoveEncryption();
      return;
    }
    if (modalMode === 'set') {
      // Encrypt the note
      try {
        const encrypted = await encryptContent(content, password);
        onUpdate(note.id, {
          title,
          isEncrypted: true,
          content: '',
          tags: parseTags(tagInput),
          ...encrypted,
        });
        setActivePassword(password);
        setShowModal(false);
        setModalError('');
      } catch (err) {
        setModalError('Encryption failed. Please try again.');
        console.error('Encryption error:', err);
      }
    } else {
      // Unlock (decrypt) the note
      try {
        const decrypted = await decryptContent(
          {
            encryptedContent: note.encryptedContent,
            iv: note.iv,
            salt: note.salt,
          },
          password
        );
        setContent(decrypted);
        setIsLocked(false);
        setActivePassword(password);
        setShowModal(false);
        setModalError('');
      } catch {
        setModalError('Failed to unlock note. Please verify your password and try again.');
      }
    }
  }

  function handleRemoveEncryption() {
    setModalMode('confirm');
    setModalError('');
    setShowModal(true);
  }

  function confirmRemoveEncryption() {
    onUpdate(note.id, {
      title,
      content,
      isEncrypted: false,
      encryptedContent: null,
      iv: null,
      salt: null,
      tags: parseTags(tagInput),
    });
    setActivePassword(null);
    setShowModal(false);
  }

  // ── Cleanup ────────────────────────────────────────────────────────────────

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="note-editor">
      {showModal && (
        <PasswordModal
          mode={modalMode}
          onConfirm={handleModalConfirm}
          onCancel={() => setShowModal(false)}
          error={modalError}
        />
      )}

      <div className="note-editor-toolbar">
        {!isLocked && cryptoAvailable && (
          <>
            {!note.isEncrypted ? (
              <button
                className="btn btn-sm btn-encrypt"
                onClick={openEncryptModal}
                title="Password-protect this note"
              >
                🔐 Encrypt
              </button>
            ) : (
              <button
                className="btn btn-sm btn-decrypt"
                onClick={handleRemoveEncryption}
                title="Remove encryption from this note"
              >
                🔓 Remove Encryption
              </button>
            )}
          </>
        )}
        {note.isEncrypted && isLocked && (
          <span className="encrypted-badge">🔐 Encrypted</span>
        )}
        {note.isEncrypted && !isLocked && (
          <span className="unlocked-badge">🔓 Unlocked</span>
        )}
      </div>

      {isLocked ? (
        <div className="locked-state">
          <div className="locked-icon">🔐</div>
          <h3 className="locked-title">{note.title || 'Untitled Note'}</h3>
          <p className="locked-description">This note is password protected.</p>
          <button className="btn btn-primary-solid" onClick={openUnlockModal}>
            Unlock Note
          </button>
        </div>
      ) : (
        <>
          <input
            className="note-editor-title"
            type="text"
            placeholder="Note title"
            value={title}
            onChange={handleTitleChange}
            maxLength={200}
          />

          <div className="note-editor-meta">
            <span>Created: {formatTimestamp(note.createdAt)}</span>
            <span>Modified: {formatTimestamp(note.updatedAt)}</span>
          </div>

          <div className="tag-input-wrapper">
            <span className="tag-input-label">🏷️</span>
            <input
              className="tag-input"
              type="text"
              placeholder="Add tags (comma separated)…"
              value={tagInput}
              onChange={handleTagInputChange}
              aria-label="Note tags"
            />
          </div>

          <textarea
            className="note-editor-content"
            placeholder="Start writing your note…"
            value={content}
            onChange={handleContentChange}
          />
        </>
      )}
    </div>
  );
}

export default NoteEditor;
