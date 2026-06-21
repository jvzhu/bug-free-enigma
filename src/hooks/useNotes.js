import { useState, useEffect } from 'react';

const STORAGE_KEY = 'notes-app-data';

const SAMPLE_NOTES = [
  {
    id: '1',
    title: 'Welcome to Notes App!',
    content:
      'This is your personal note-taking app. You can create, edit, and delete notes. All your notes are automatically saved to your browser\'s localStorage.',
    createdAt: new Date('2026-06-01T10:00:00').toISOString(),
    updatedAt: new Date('2026-06-01T10:00:00').toISOString(),
  },
  {
    id: '2',
    title: 'Getting Started',
    content:
      '• Click "New Note" to create a note\n• Click any note in the list to view or edit it\n• Use the trash icon to delete a note\n• Changes are saved automatically',
    createdAt: new Date('2026-06-01T10:05:00').toISOString(),
    updatedAt: new Date('2026-06-01T10:05:00').toISOString(),
  },
  {
    id: '3',
    title: 'Shopping List',
    content: '- Milk\n- Eggs\n- Bread\n- Coffee\n- Fruits',
    createdAt: new Date('2026-06-02T09:00:00').toISOString(),
    updatedAt: new Date('2026-06-02T09:00:00').toISOString(),
  },
];

function loadNotesFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error('Failed to load notes from localStorage:', err);
  }
  return null;
}

function saveNotesToStorage(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('Failed to save notes to localStorage:', err);
  }
}

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    const stored = loadNotesFromStorage();
    return stored !== null ? stored : SAMPLE_NOTES;
  });

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  function createNote() {
    const now = new Date().toISOString();
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote.id;
  }

  function updateNote(id, changes) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...changes, updatedAt: new Date().toISOString() }
          : note
      )
    );
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  return { notes, createNote, updateNote, deleteNote };
}
