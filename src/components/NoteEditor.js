import React, { useState, useEffect, useRef } from 'react';

const AUTOSAVE_DELAY = 500;

function NoteEditor({ note, onUpdate }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const timerRef = useRef(null);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id]);

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

  return (
    <div className="note-editor">
      <input
        className="note-editor-title"
        type="text"
        placeholder="Note title"
        value={title}
        onChange={handleTitleChange}
        maxLength={200}
      />
      <div className="note-editor-meta">Last updated: {lastUpdated}</div>
      <textarea
        className="note-editor-content"
        placeholder="Start writing your note..."
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
}

export default NoteEditor;
