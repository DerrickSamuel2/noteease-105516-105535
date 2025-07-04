# Product Requirements: NoteEase App (notes_frontend)

## Overview

NoteEase is a minimalistic, fast, and responsive web application for creating, editing, viewing, and deleting notes. The user interface is intentionally simple, allowing for productivity and clarity on any device. Supabase is used as the backend for secure, real-time data storage and retrieval.

## Target Users

- Anyone needing a lightweight, web-based note-taking tool
- Users focused on speed, simplicity, and accessibility
- Desktop and mobile device users (responsive UI)

## Functional Requirements

**1. Create Note**
- Users can create a new note using a prominent floating action button.
- Each note requires at least a title and can also have content.
- Notes are stored immediately in the Supabase database.

**2. Edit Note**
- Existing notes can be edited by clicking the edit icon.
- Editing opens a modal form, pre-filled with the note’s details.

**3. Delete Note**
- Notes may be deleted with the delete icon. 
- Before deletion, the user receives a confirmation prompt to prevent accidental data loss.

**4. List Notes**
- All notes belonging to the user are displayed in a scrollable, chronologically ordered list (most recently updated first).
- If no notes exist, a friendly empty state is shown.

**5. Data Persistence**
- Notes are persistent across sessions and devices via Supabase’s hosted backend.

**6. Error and Loading Handling**
- Visual indicators (spinners, banners) appear during loading or if errors occur (such as failed CRUD operations).

**7. Theme Toggle**
- Users can switch between light and dark themes with a single button, adapting the app appearance instantly.

**8. Responsiveness**
- UI adapts to both mobile and desktop screen sizes.
- Key controls (FAB, modals, etc.) remain accessible at all screen sizes.

**9. Accessibility**
- Keyboard and screen reader accessible modals and controls.

## Non-Functional Requirements

- **Performance:** Fast loading and quick interactions
- **Minimal Dependencies:** Only uses essential dependencies (React, Supabase, no heavy frameworks)
- **Security:** Never exposes Supabase keys except using public (anon) role for client access
- **Maintainability:** Readable codebase, well-structured reusable components
- **Branding:** Color palette and styles as per KAVIA guidelines

## Technologies

- **Frontend:** React (18.x)
- **Styling:** Vanilla CSS (responsive, themed)
- **Backend:** Supabase (PostgreSQL, RESTful API)
- **Build Tool/Runner:** react-scripts

## Environment

- **Supabase URL:** Provided via environment variable or default fallback
- **Supabase Key:** Provided via environment variable or default fallback

