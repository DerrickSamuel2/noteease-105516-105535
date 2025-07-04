import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import {
  Header,
  NoteList,
  NoteEditorModal,
  FloatingActionButton,
  LoadingSpinner,
  ErrorBanner,
} from './components';
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from './supabase';

// PUBLIC_INTERFACE
/**
 * App component for NoteEase - minimal notes app with Supabase backend.
 * Handles state, CRUD operations, error/loading UI, and theme.
 */
function App() {
  // Theme state
  const [theme, setTheme] = useState('light');
  // Notes
  const [notes, setNotes] = useState([]);
  // Modal: open state, note being edited/created, mode (edit/create)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNote, setModalNote] = useState({});
  const [modalMode, setModalMode] = useState('create');
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch all notes on mount
  const loadNotes = useCallback(() => {
    setLoading(true);
    setError('');
    fetchNotes()
      .then(setNotes)
      .catch(e => setError('Failed to load notes.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Theme toggle
  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Open new note modal
  // PUBLIC_INTERFACE
  const handleNewNote = () => {
    setModalNote({ title: '', content: '' });
    setModalMode('create');
    setModalError('');
    setModalOpen(true);
  };

  // Open edit note modal
  // PUBLIC_INTERFACE
  const handleEditNote = (note) => {
    setModalNote(note);
    setModalMode('edit');
    setModalError('');
    setModalOpen(true);
  };

  // Save note (create or update)
  // PUBLIC_INTERFACE
  const handleSaveNote = async ({ title, content }) => {
    setModalLoading(true);
    setModalError('');
    try {
      if (modalMode === 'create') {
        await createNote({ title, content });
      } else {
        await updateNote(modalNote.id, { title, content });
      }
      setModalOpen(false);
      loadNotes();
    } catch (e) {
      setModalError('Failed to save note.');
    } finally {
      setModalLoading(false);
    }
  };

  // Delete note
  // PUBLIC_INTERFACE
  const handleDeleteNote = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteNote(id);
      loadNotes();
    } catch (e) {
      setError('Failed to delete note.');
    } finally {
      setLoading(false);
    }
  };

  // Modal close
  // PUBLIC_INTERFACE
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalError('');
  };

  // Retry loading
  // PUBLIC_INTERFACE
  const retryLoad = () => loadNotes();

  return (
    <div className="notes-app">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <Header />
      <main className="notes-main">
        {error && <ErrorBanner error={error} onRetry={retryLoad} />}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <NoteList
            notes={notes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />
        )}
      </main>
      <FloatingActionButton onClick={handleNewNote} />
      <NoteEditorModal
        open={modalOpen}
        mode={modalMode}
        initialNote={modalNote}
        onClose={handleCloseModal}
        onSave={handleSaveNote}
        loading={modalLoading}
        error={modalError}
      />
    </div>
  );
}

export default App;
