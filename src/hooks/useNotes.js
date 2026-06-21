import { useState, useEffect } from 'react';

const STORAGE_KEY = 'notes-app-data';

const SAMPLE_NOTES = [
  {
    id: '1',
    title: 'Welcome to Notes App!',
    content:
      "This is your personal note-taking app. You can create, edit, and delete notes. All your notes are automatically saved to your browser's localStorage.\n\n✨ New features:\n• 🔐 Encrypt notes with a password\n• 🌙 Dark mode toggle\n• 🔍 Search notes by title or content\n• 🏷️ Add tags to organise notes\n• 🕒 Timestamps on every note",
    tags: ['welcome', 'info'],
    isEncrypted: false,
    encryptedContent: null,
    iv: null,
    salt: null,
    createdAt: new Date('2026-06-01T10:00:00').toISOString(),
    updatedAt: new Date('2026-06-01T10:00:00').toISOString(),
  },
  {
    id: '2',
    title: 'Getting Started',
    content:
      '• Click "+ New Note" to create a note\n• Click any note in the list to view or edit it\n• Use the 🗑 icon to delete a note\n• Click 🔐 to password-protect a note\n• Use the search bar to filter notes\n• Click tags to filter by category\n• Toggle 🌙 for dark mode\n• Changes are saved automatically',
    tags: ['guide'],
    isEncrypted: false,
    encryptedContent: null,
    iv: null,
    salt: null,
    createdAt: new Date('2026-06-01T10:05:00').toISOString(),
    updatedAt: new Date('2026-06-01T10:05:00').toISOString(),
  },
  {
    id: '3',
    title: 'Shopping List',
    content: '- Milk\n- Eggs\n- Bread\n- Coffee\n- Fruits',
    tags: ['personal', 'shopping'],
    isEncrypted: false,
    encryptedContent: null,
    iv: null,
    salt: null,
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
      tags: [],
      isEncrypted: false,
      encryptedContent: null,
      iv: null,
      salt: null,
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
