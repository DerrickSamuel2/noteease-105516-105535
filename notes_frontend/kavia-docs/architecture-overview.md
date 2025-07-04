# Architecture Overview: NoteEase Frontend

## 1. High-Level Structure

The frontend architecture is based on React functional components with a clear separation between UI and data logic. Supabase is used as a backend as a service (BaaS), handling all network and CRUD data persistence for notes.

**Major Layers:**
- **UI Layer:** React components for input, display, and feedback
- **State & Effects:** App-level state managed in the App component using React hooks
- **Data Layer:** CRUD operations in a separate data module interfacing Supabase

## 2. Flow of Control (CRUD & Data Flow)

1. **App Initialization:**  
   The `index.js` file renders the root `App` component.

2. **Fetching Notes:**  
   On mount, the App component calls `fetchNotes()` from the data layer, which queries Supabase and sends results to the UI.

3. **Creating/Editing/Deleting Notes:**  
   - Modal dialogs are used for creating or editing, using `createNote` or `updateNote` helpers, respectively.
   - Deletion uses the `deleteNote` helper.
   - On every data change, notes are re-fetched for freshness.

4. **Error & Loading States:**
   - All fetch and mutation operations set loading and error state which is surfaced through LoadingSpinner or ErrorBanner components.

5. **Theme Management:**  
    - Toggling the theme updates the global `data-theme` attribute, with CSS variables in App.css adapting the UI.

## 3. React Component Hierarchy

- **index.js**
  - Renders `<App />`
- **App.js**
  - Manages global state, orchestrates CRUD, loading/error, and theme.
  - Child components:
    - `<Header />` (app title/subtitle)
    - `<NoteList />` (list of notes)
      - Contains many `<NoteItem />` components (each represents a note)
    - `<FloatingActionButton />` (opens the modal for new note)
    - `<NoteEditorModal />` (modal for editing/creating notes)
    - `<LoadingSpinner />` (visual feedback during async loads)
    - `<ErrorBanner />` (shown on errors)

- **supabase.js**
  - Contains all async logic to interact with the Supabase API:
    - `fetchNotes`, `createNote`, `updateNote`, and `deleteNote`.

## 4. Supabase Integration

- `supabase.js` initializes a Supabase client with environment-configured URL and Key.
- All note data is stored in the "notes" table.
- CRUD helpers are cleanly separated and invoked from the App component’s handlers.
- Only public operations are done from the frontend (anon role).

## 5. Styling

- **App.css** provides all visual styles:
  - CSS variables enable KAVIA-themed color, light/dark themes.
  - All components and interactive controls adapt to both mobile and desktop layouts.
  - No third-party UI components/frameworks; the design is purposely minimal and accessible.

## 6. Deployment

- Installed and run using standard React scripts (`npm start`, `npm build`).
- Can be fully served as a static SPA connecting directly to Supabase.

## 7. Security

- Only public (anon) Supabase key is exposed in code.
- All database access is performed through Supabase row-level policies (not handled by frontend).

## 8. File Structure (Key Files)

- `src/App.js` — Root component and app logic
- `src/components.js` — UI components
- `src/supabase.js` — Data access and Supabase client initialization
- `src/App.css` — Main stylesheet, variables, responsiveness, themes
- `src/index.js` — Entry point to React app

