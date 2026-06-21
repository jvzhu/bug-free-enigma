import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthProvider, useAuthContext } from './hooks/useAuth';
import { useNotes } from './hooks/useNotes';
import { useSession } from './hooks/useSession';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import AuthGate from './components/AuthGate';
import SessionWarningModal from './components/SessionWarningModal';
import SecurityPanel from './components/SecurityPanel';
import BatchOperationsPanel from './components/BatchOperationsPanel';
import './App.css';

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
  const [selectedNoteId, setSelectedNoteId] = useState(notes.length > 0 ? notes[0].id : null);
  const [showSecurityPanel, setShowSecurityPanel] = useState(false);
  const [showBatchPanel, setShowBatchPanel] = useState(false);

  useEffect(() => {
    if (!notes.find((note) => note.id === selectedNoteId)) {
      setSelectedNoteId(notes[0]?.id || null);
    }
  }, [notes, selectedNoteId]);

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
  }

  const shouldShowAuthGate = isSetupComplete && !isAuthenticated;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">📝 Notes</h1>
        <div className="header-actions">
          <button className="btn btn-header" onClick={handleNewNote}>
            + New Note
          </button>
          <button className="btn btn-header btn-security" onClick={() => setShowBatchPanel(true)}>
            🗂 Batch Ops
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
        />
      )}
      {showBatchPanel && (
        <BatchOperationsPanel
          notes={notes}
          encryptionKey={encryptionKey}
          onUpdateNotes={replaceNotes}
          onClose={() => setShowBatchPanel(false)}
        />
      )}
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
