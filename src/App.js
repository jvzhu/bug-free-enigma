import React, { useState, useMemo } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useNotes } from './hooks/useNotes';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import './App.css';

function AppContent() {
  const { notes, createNote, updateNote, deleteNote } = useNotes();
  const { isDark, toggleTheme } = useTheme();
  const [selectedNoteId, setSelectedNoteId] = useState(
    notes.length > 0 ? notes[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;

  // Collect all unique tags from all notes
  const allTags = useMemo(() => {
    const tagSet = new Set();
    notes.forEach((note) => (note.tags || []).forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [notes]);

  // Filter notes by search query and active tag
  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return notes.filter((note) => {
      const matchesSearch =
        !q ||
        note.title.toLowerCase().includes(q) ||
        (!note.isEncrypted && note.content.toLowerCase().includes(q));
      const matchesTag =
        !activeTag || (note.tags || []).includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [notes, searchQuery, activeTag]);

  function handleNewNote() {
    const id = createNote();
    setSelectedNoteId(id);
    setSearchQuery('');
    setActiveTag(null);
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

  function handleTagClick(tag) {
    setActiveTag((prev) => (prev === tag ? null : tag));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">📝 Notes</h1>
        <div className="header-actions">
          <button
            className="btn btn-icon-header"
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button className="btn btn-primary" onClick={handleNewNote}>
            + New Note
          </button>
        </div>
      </header>
      <div className="app-body">
        <aside className="sidebar">
          <NoteList
            notes={filteredNotes}
            allTags={allTags}
            activeTag={activeTag}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onTagClick={handleTagClick}
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
              <button className="btn btn-primary-solid" onClick={handleNewNote}>
                Create your first note
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
