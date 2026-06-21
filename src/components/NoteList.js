import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, selectedNoteId, onSelect, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        <p>No notes found.</p>
      </div>
    );
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          isSelected={note.id === selectedNoteId}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default NoteList;
