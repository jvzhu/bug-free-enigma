import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthProvider, useAuthContext } from './hooks/useAuth';
import { useNotes } from './hooks/useNotes';
import { useSession } from './hooks/useSession';
import { useDarkMode } from './hooks/useDarkMode';
import { useToast } from './hooks/useToast';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import AuthGate from './components/AuthGate';
import SessionWarningModal from './components/SessionWarningModal';
import SecurityPanel from './components/SecurityPanel';
import BatchOperationsPanel from './components/BatchOperationsPanel';
import ImportModal from './components/ImportModal';
import ToastContainer from './components/ToastContainer';
import ShareModal from './components/ShareModal';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import { decodeSharePayload } from './utils/shareUtils';
import { validateImportedNote } from './utils/importUtils';
import { generateId } from './utils/fileDownload';
import './App.css';

function clearShareParam() {
  const url = new URL(window.location.href);
  url.searchParams.delete('share');
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, document.title, nextUrl);
}

function prepareImportedNotes(notes = []) {
  return notes.map((note) => {
    const now = new Date().toISOString();
    return {
      id: generateId(),
      title: typeof note?.title === 'string' ? note.title : '',
      content: typeof note?.content === 'string' ? note.content : '',
      tags: Array.isArray(note?.tags) ? Array.from(new Set(note.tags.filter(Boolean))) : [],
      createdAt: note?.createdAt || now,
      updatedAt: now,
      isEncrypted: Boolean(note?.isEncrypted || note?.encryptedData),
      encryptedData: note?.encryptedData || null,
    };
  });
}

function AppShell() {
  const {
    isSetupComplete,
    isAuthenticated,
    encryptionKey,
    securityConfig,
    logout,
  } = useAuthContext();
  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
    replaceNotes,
    encryptNote,
    decryptNote,
  } = useNotes();
  const { isDark, toggleDark } = useDarkMode();
  const { toasts, addToast, removeToast } = useToast();
  const [selectedNoteId, setSelectedNoteId] = useState(notes.length > 0 ? notes[0].id : null);
  const [showSecurityPanel, setShowSecurityPanel] = useState(false);
  const [showBatchPanel, setShowBatchPanel] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [sharedNoteToImport, setSharedNoteToImport] = useState(null);

  useEffect(() => {
    if (!notes.find((note) => note.id === selectedNoteId)) {
      setSelectedNoteId(notes[0]?.id || null);
    }
  }, [notes, selectedNoteId]);

  useEffect(() => {
    const sharedPayload = new URLSearchParams(window.location.search).get('share');
    if (!sharedPayload) {
      return;
    }

    const decoded = decodeSharePayload(sharedPayload);
    if (!decoded) {
      addToast('Invalid shared note link.', 'error');
      clearShareParam();
      return;
    }

    const candidateNote = {
      title: decoded.title || '',
      content: decoded.content || '',
      tags: Array.isArray(decoded.tags) ? decoded.tags : [],
      encryptedData: decoded.encryptedData || null,
      isEncrypted: Boolean(decoded.isEncrypted || decoded.encryptedData),
    };
    const validation = validateImportedNote(candidateNote);

    if (!validation.valid) {
      addToast(validation.error, 'error');
      clearShareParam();
      return;
    }

    setSharedNoteToImport(candidateNote);
    clearShareParam();
  }, [addToast]);

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  );

  const handleLock = useCallback(() => {
    logout();
    setShowSecurityPanel(false);
    setShowBatchPanel(false);
  }, [logout]);

  const { showWarning, remainingSeconds, resetSession } = useSession(
    isSetupComplete ? isAuthenticated : false,
    handleLock,
    securityConfig?.preferences?.sessionTimeoutMinutes || 15
  );

  function handleNewNote() {
    const id = createNote();
    setSelectedNoteId(id);
    addToast('New note created.', 'success');
  }

  function handleSelectNote(id) {
    resetSession();
    setSelectedNoteId(id);
  }

  function handleDeleteNote(id) {
    deleteNote(id);
    if (selectedNoteId === id) {
      const remaining = notes.filter((n) => n.id !== id);
      setSelectedNoteId(remaining.length > 0 ? remaining[0].id : null);
    }
    addToast('Note deleted.', 'info');
  }

  const handleImportNotes = useCallback((importedNotes) => {
    const preparedNotes = prepareImportedNotes(importedNotes);
    replaceNotes([...preparedNotes, ...notes]);
    if (preparedNotes[0]) {
      setSelectedNoteId(preparedNotes[0].id);
    }
    setShowImportModal(false);
    setSharedNoteToImport(null);
    addToast(`Imported ${preparedNotes.length} note${preparedNotes.length === 1 ? '' : 's'}.`, 'success');
  }, [addToast, notes, replaceNotes]);

  const deleteNotes = useCallback((ids = []) => {
    const idSet = new Set(ids);
    const remaining = notes.filter((note) => !idSet.has(note.id));
    replaceNotes(remaining);
    if (selectedNoteId && idSet.has(selectedNoteId)) {
      setSelectedNoteId(remaining[0]?.id || null);
    }
    setShowBatchPanel(false);
    addToast(`Deleted ${ids.length} note${ids.length === 1 ? '' : 's'}.`, 'success');
  }, [addToast, notes, replaceNotes, selectedNoteId]);

  const shouldShowAuthGate = isSetupComplete && !isAuthenticated;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">📝 Notes</h1>
        <div className="header-actions">
          <button className="btn btn-header" onClick={handleNewNote}>
            + New Note
          </button>
          <button className="btn btn-header" onClick={() => setShowImportModal(true)}>
            📥 Import
          </button>
          <button className="btn btn-header btn-security" onClick={() => setShowBatchPanel(true)}>
            🗂 Batch Ops
          </button>
          <button className="btn btn-header" onClick={() => setShowShareModal(true)} disabled={!selectedNote}>
            🔗 Share
          </button>
          <button className="btn btn-header" onClick={() => setShowShortcutsModal(true)}>
            ❓ Help
          </button>
          <button className="btn btn-header" onClick={toggleDark}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="btn btn-header btn-security" onClick={() => setShowSecurityPanel(true)}>
            🔐 Security
          </button>
        </div>
      </header>
      <div className="app-body">
        <aside className="sidebar">
          <NoteList
            notes={notes}
            selectedNoteId={selectedNoteId}
            onSelect={handleSelectNote}
            onDelete={handleDeleteNote}
          />
        </aside>
        <main className="editor-pane">
          {selectedNote ? (
            <NoteEditor
              key={selectedNote.id}
              note={selectedNote}
              onUpdate={updateNote}
              onEncryptNote={encryptNote}
              onDecryptNote={decryptNote}
              encryptionKey={encryptionKey}
            />
          ) : (
            <div className="empty-state">
              <p>No notes yet.</p>
              <button className="btn btn-action" onClick={handleNewNote}>
                Create your first note
              </button>
            </div>
          )}
        </main>
      </div>

      {shouldShowAuthGate && <AuthGate onAuthenticated={resetSession} />}
      {showWarning && isAuthenticated && (
        <SessionWarningModal
          remainingSeconds={remainingSeconds}
          onContinue={resetSession}
          onLock={handleLock}
        />
      )}
      {showSecurityPanel && (
        <SecurityPanel
          onClose={() => setShowSecurityPanel(false)}
          notes={notes}
          encryptionKey={encryptionKey}
          onUpdateNotes={replaceNotes}
          onNotify={addToast}
        />
      )}
      {showBatchPanel && (
        <BatchOperationsPanel
          notes={notes}
          encryptionKey={encryptionKey}
          onUpdateNotes={replaceNotes}
          onDeleteNotes={deleteNotes}
          onClose={() => setShowBatchPanel(false)}
          onNotify={addToast}
        />
      )}
      {showImportModal && (
        <ImportModal
          onClose={() => setShowImportModal(false)}
          onImport={handleImportNotes}
        />
      )}
      {showShareModal && selectedNote && (
        <ShareModal
          note={selectedNote}
          onClose={() => setShowShareModal(false)}
          onCopied={() => addToast('Share URL copied to clipboard.', 'success')}
        />
      )}
      {showShortcutsModal && <KeyboardShortcutsModal onClose={() => setShowShortcutsModal(false)} />}
      {sharedNoteToImport && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Import Shared Note?</h3>
              <button className="btn btn-icon" type="button" onClick={() => setSharedNoteToImport(null)}>
                ✕
              </button>
            </div>
            <p>
              Import <strong>{sharedNoteToImport.title || 'Untitled Note'}</strong> into your notes?
            </p>
            <div className="button-row">
              <button className="btn btn-secondary" type="button" onClick={() => setSharedNoteToImport(null)}>
                Cancel
              </button>
              <button className="btn btn-action" type="button" onClick={() => handleImportNotes([sharedNoteToImport])}>
                Import Note
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

export default App;
