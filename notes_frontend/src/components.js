/**
 * Notes App UI components: Header, NoteList, NoteItem, NoteEditorModal, FAB and Error/Loading UI.
 * Minimal, accessible, and responsive design.
 */

import React from 'react';

// PUBLIC_INTERFACE
export function Header() {
  return (
    <header className="notes-header">
      <h1>NoteEase</h1>
      <span className="subtitle">Simple, fast notes</span>
    </header>
  );
}

// PUBLIC_INTERFACE
export function NoteList({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return <div className="empty-notes">No notes yet. Create your first note!</div>;
  }
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={() => onEdit(note)}
          onDelete={() => onDelete(note.id)}
        />
      ))}
    </ul>
  );
}

// PUBLIC_INTERFACE
export function NoteItem({ note, onEdit, onDelete }) {
  return (
    <li className="note-item" tabIndex={0} aria-label={`Note titled ${note.title}`}>
      <div className="note-content" onClick={onEdit}>
        <strong className="note-title">{note.title || <em>Untitled</em>}</strong>
        <div className="note-snippet">{note.content ? note.content.slice(0, 60) : ''}</div>
      </div>
      <div className="note-actions">
        <button
          className="note-btn note-edit"
          onClick={onEdit}
          title="Edit note"
          aria-label="Edit note"
        >
          ✏️
        </button>
        <button
          className="note-btn note-delete"
          onClick={onDelete}
          title="Delete note"
          aria-label="Delete note"
        >
          🗑
        </button>
      </div>
    </li>
  );
}

// PUBLIC_INTERFACE
export function FloatingActionButton({ onClick }) {
  return (
    <button
      className="fab"
      aria-label="Create new note"
      title="Create new note"
      onClick={onClick}
    >
      +
    </button>
  );
}

// PUBLIC_INTERFACE
export function NoteEditorModal({
  open,
  mode,
  initialNote,
  onClose,
  onSave,
  loading,
  error,
}) {
  const [title, setTitle] = React.useState(initialNote.title || '');
  const [content, setContent] = React.useState(initialNote.content || '');

  React.useEffect(() => {
    if (open) {
      setTitle(initialNote.title || '');
      setContent(initialNote.content || '');
    }
  }, [open, initialNote]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ title, content });
  }

  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose} tabIndex={-1}>
      <div
        className="modal"
        onClick={e => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
      >
        <h2>{mode === 'edit' ? 'Edit Note' : 'New Note'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Title
              <input
                className="input"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={80}
                placeholder="Note title"
                disabled={loading}
                autoFocus
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Content
              <textarea
                className="textarea"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={7}
                maxLength={1000}
                placeholder="Type your note here..."
                disabled={loading}
              />
            </label>
          </div>
          <div className="modal-actions">
            <button
              className="modal-btn"
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="modal-btn modal-save"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
        {error && <div className="error-msg" role="alert">{error}</div>}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function LoadingSpinner() {
  return <div className="loading-spinner" role="status" aria-label="Loading"></div>;
}

// PUBLIC_INTERFACE
export function ErrorBanner({ error, onRetry }) {
  return (
    <div className="error-banner">
      <span>{error}</span>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
