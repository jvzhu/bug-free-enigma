import React from 'react';

function formatRelativeTime(isoString) {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now - date;

  if (diffMs < 0) {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function NoteItem({ note, isSelected, onSelect, onDelete }) {
  const title = note.title.trim() || 'Untitled Note';
  const preview = note.isEncrypted
    ? 'Encrypted note'
    : note.content.replace(/\n/g, ' ').slice(0, 80) || 'No content';
  const tags = note.tags || [];

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
          {note.isEncrypted && <span className="lock-icon" aria-label="Encrypted">🔐</span>}
          <h3 className="note-item-title">{title}</h3>
        </div>
        <p className={`note-item-preview${note.isEncrypted ? ' note-item-preview--encrypted' : ''}`}>
          {preview}
        </p>
        {tags.length > 0 && (
          <div className="note-item-tags">
            {tags.map((tag) => (
              <span key={tag} className="tag-badge">#{tag}</span>
            ))}
          </div>
        )}
        <span className="note-item-date">{formatRelativeTime(note.updatedAt)}</span>
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
