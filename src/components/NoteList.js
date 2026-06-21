import React from 'react';
import NoteItem from './NoteItem';

function NoteList({
  notes,
  allTags,
  activeTag,
  searchQuery,
  onSearchChange,
  onTagClick,
  selectedNoteId,
  onSelect,
  onDelete,
}) {
  return (
    <div className="note-list-container">
      <div className="search-bar-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          className="search-input"
          type="search"
          placeholder="Search notes…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search notes"
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {allTags.length > 0 && (
        <div className="tag-filter">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`tag-chip${activeTag === tag ? ' tag-chip--active' : ''}`}
              onClick={() => onTagClick(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {notes.length === 0 ? (
        <div className="note-list-empty">
          <p>{searchQuery || activeTag ? 'No notes match your search.' : 'No notes found.'}</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default NoteList;
