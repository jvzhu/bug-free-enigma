import React, { useState } from 'react';
import { useNotes } from './hooks/useNotes';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import './App.css';

function App() {
  const { notes, createNote, updateNote, deleteNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState(
    notes.length > 0 ? notes[0].id : null
  );

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;

  function handleNewNote() {
    const id = createNote();
    setSelectedNoteId(id);
  }

  function handleSelectNote(id) {
    setSelectedNoteId(id);
  }

  function handleDeleteNote(id) {
    deleteNote(id);
    if (selectedNoteId === id) {
      const remaining = notes.filter((n) => n.id !== id);
      setSelectedNoteId(remaining.length > 0 ? remaining[0].id : null);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">📝 Notes</h1>
        <button className="btn btn-primary" onClick={handleNewNote}>
          + New Note
        </button>
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
            />
          ) : (
            <div className="empty-state">
              <p>No notes yet.</p>
              <button className="btn btn-primary" onClick={handleNewNote}>
                Create your first note
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
