import { useCallback, useEffect, useState } from 'react';
import { decryptData, encryptData } from '../utils/crypto';
import { loadSecurityConfig } from '../utils/securityStorage';

const STORAGE_KEY = 'notes-app-data';

const SAMPLE_NOTES = [
  {
    id: '1',
    title: 'Welcome to Notes App!',
    content:
      'This is your personal note-taking app. You can create, edit, and delete notes. All your notes are automatically saved to your browser\'s localStorage.',
    createdAt: new Date('2026-06-01T10:00:00').toISOString(),
    updatedAt: new Date('2026-06-01T10:00:00').toISOString(),
    isEncrypted: false,
    encryptedData: null,
    tags: ['welcome'],
  },
  {
    id: '2',
    title: 'Getting Started',
    content:
      '• Click "New Note" to create a note\n• Click any note in the list to view or edit it\n• Use the trash icon to delete a note\n• Changes are saved automatically',
    createdAt: new Date('2026-06-01T10:05:00').toISOString(),
    updatedAt: new Date('2026-06-01T10:05:00').toISOString(),
    isEncrypted: false,
    encryptedData: null,
    tags: ['guide'],
  },
  {
    id: '3',
    title: 'Shopping List',
    content: '- Milk\n- Eggs\n- Bread\n- Coffee\n- Fruits',
    createdAt: new Date('2026-06-02T09:00:00').toISOString(),
    updatedAt: new Date('2026-06-02T09:00:00').toISOString(),
    isEncrypted: false,
    encryptedData: null,
    tags: ['personal'],
  },
];

function normalizeNote(note) {
  return {
    ...note,
    isEncrypted: Boolean(note?.isEncrypted || note?.encryptedData),
    encryptedData: note?.encryptedData || null,
    tags: Array.isArray(note?.tags) ? Array.from(new Set(note.tags.filter(Boolean))) : [],
    title: typeof note?.title === 'string' ? note.title : '',
    content: typeof note?.content === 'string' ? note.content : '',
  };
}

function loadNotesFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored).map(normalizeNote);
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
    return stored !== null ? stored : SAMPLE_NOTES.map(normalizeNote);
  });

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const createNote = useCallback(() => {
    const now = new Date().toISOString();
    const config = loadSecurityConfig();
    const encryptByDefault = Boolean(config?.preferences?.encryptByDefault);
    const newNote = normalizeNote({
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
      isEncrypted: encryptByDefault,
      encryptedData: null,
      tags: [],
    });
    setNotes((prev) => [newNote, ...prev]);
    return newNote.id;
  }, []);

  const updateNote = useCallback((id, changes) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? normalizeNote({ ...note, ...changes, updatedAt: new Date().toISOString() })
          : note
      )
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const replaceNotes = useCallback((newNotes) => {
    setNotes((newNotes || []).map(normalizeNote));
  }, []);

  const encryptNote = useCallback(async (id, key) => {
    const target = notes.find((note) => note.id === id);
    if (!target) {
      throw new Error('Note not found.');
    }
    if (target.encryptedData) {
      return target;
    }

    const encryptedData = await encryptData(
      JSON.stringify({
        title: target.title || '',
        content: target.content || '',
        tags: target.tags || [],
      }),
      key
    );

    const nextNotes = notes.map((note) =>
      note.id === id
        ? normalizeNote({
            ...note,
            title: '',
            content: '',
            encryptedData,
            isEncrypted: true,
            updatedAt: new Date().toISOString(),
          })
        : note
    );

    setNotes(nextNotes);
    return nextNotes.find((note) => note.id === id);
  }, [notes]);

  const decryptNote = useCallback(async (id, key) => {
    const target = notes.find((note) => note.id === id);
    if (!target) {
      throw new Error('Note not found.');
    }
    if (!target.encryptedData) {
      return target;
    }

    let decryptedPayload;
    try {
      decryptedPayload = JSON.parse(await decryptData(target.encryptedData, key));
    } catch (error) {
      throw new Error('Failed to decrypt note: corrupted data or incorrect key.');
    }
    const nextNotes = notes.map((note) =>
      note.id === id
        ? normalizeNote({
            ...note,
            title: decryptedPayload.title || '',
            content: decryptedPayload.content || '',
            tags: Array.isArray(decryptedPayload.tags) ? decryptedPayload.tags : [],
            encryptedData: null,
            isEncrypted: false,
            updatedAt: new Date().toISOString(),
          })
        : note
    );

    setNotes(nextNotes);
    return nextNotes.find((note) => note.id === id);
  }, [notes]);

  const encryptAllNotes = useCallback(async (key) => {
    const nextNotes = await Promise.all(
      notes.map(async (note) => {
        if (note.encryptedData) {
          return note;
        }
        const encryptedData = await encryptData(
          JSON.stringify({
            title: note.title || '',
            content: note.content || '',
            tags: note.tags || [],
          }),
          key
        );

        return normalizeNote({
          ...note,
          title: '',
          content: '',
          encryptedData,
          isEncrypted: true,
          updatedAt: new Date().toISOString(),
        });
      })
    );

    setNotes(nextNotes);
    return nextNotes;
  }, [notes]);

  const decryptAllNotes = useCallback(async (key) => {
    const nextNotes = await Promise.all(
      notes.map(async (note) => {
        if (!note.encryptedData) {
          return normalizeNote({ ...note, isEncrypted: false });
        }
        let decryptedPayload;
        try {
          decryptedPayload = JSON.parse(await decryptData(note.encryptedData, key));
        } catch (error) {
          throw new Error('Failed to decrypt note: corrupted data or incorrect key.');
        }
        return normalizeNote({
          ...note,
          title: decryptedPayload.title || '',
          content: decryptedPayload.content || '',
          tags: Array.isArray(decryptedPayload.tags) ? decryptedPayload.tags : [],
          encryptedData: null,
          isEncrypted: false,
          updatedAt: new Date().toISOString(),
        });
      })
    );

    setNotes(nextNotes);
    return nextNotes;
  }, [notes]);

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
    replaceNotes,
    encryptNote,
    decryptNote,
    encryptAllNotes,
    decryptAllNotes,
  };
}
