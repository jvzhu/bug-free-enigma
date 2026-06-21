import React from 'react';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function NoteItem({ note, isSelected, onSelect, onDelete }) {
  const isLocked = Boolean(note.isEncrypted);
  const title = isLocked
    ? note.title.trim() || '🔒 Encrypted Note'
    : note.title.trim() || 'Untitled Note';
  const preview = isLocked
    ? 'Encrypted'
    : note.content.replace(/\n/g, ' ').slice(0, 80) || 'No content';

  function handleDelete(e) {
    e.stopPropagation();
    if (window.confirm(`Delete "${title}"?`)) {
      onDelete(note.id);
    }
  }

  return (
    <li
      className={`note-item${isSelected ? ' note-item--selected' : ''}`}
      onClick={() => onSelect(note.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(note.id)}
    >
      <div className="note-item-content">
        <div className="note-item-title-row">
          <h3 className="note-item-title">{title}</h3>
          {isLocked && (
            <span className="note-lock-badge" aria-label="Encrypted note" title="Encrypted note">
              <span aria-hidden="true">🔒</span>
            </span>
          )}
        </div>
        <p className="note-item-preview">{preview}</p>
        {note.tags?.length > 0 && (
          <div className="note-tags">
            {note.tags.map((tag) => (
              <span key={tag} className="note-tag">#{tag}</span>
            ))}
          </div>
        )}
        <span className="note-item-date">{formatDate(note.updatedAt)}</span>
      </div>
      <button
        className="btn btn-icon btn-danger"
        onClick={handleDelete}
        title="Delete note"
        aria-label={`Delete note: ${title}`}
      >
        🗑
      </button>
    </li>
  );
}

export default NoteItem;
