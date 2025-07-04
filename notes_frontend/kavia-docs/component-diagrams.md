# Component & Architecture Diagrams: NoteEase (notes_frontend)

## Component Hierarchy Diagram (Mermaid)

```mermaid
graph TD
  Index["index.js"]
  App["App.js<br/>- Global state<br/>- CRUD ops<br/>- Theme mgmt"]
  Header["Header<br/>(Title, subtitle)"]
  NoteList["NoteList<br/>(maps notes array)"]
  NoteItem["NoteItem<br/>(single note, edit/delete)"]
  FAB["FloatingActionButton<br/>(Create)"]
  Modal["NoteEditorModal<br/>(New/Edit note)"]
  Spinner["LoadingSpinner"]
  ErrorBanner["ErrorBanner<br/>(Error message, retry)"]

  Index --> App
  App --> Header
  App --> NoteList
  App --> FAB
  App --> Modal
  App --> Spinner
  App --> ErrorBanner
  NoteList --> NoteItem
```

## Data Flow & CRUD Operations Diagram (Mermaid)

```mermaid
sequenceDiagram
    participant User
    participant AppComponent as App.js
    participant Modal as NoteEditorModal
    participant SupabaseHelpers as supabase.js
    participant SupabaseDB

    User->>AppComponent: Load page / interact
    AppComponent->>SupabaseHelpers: fetchNotes()
    SupabaseHelpers->>SupabaseDB: SELECT * FROM notes
    SupabaseDB-->>SupabaseHelpers: result
    SupabaseHelpers-->>AppComponent: notes array
    AppComponent->>Modal: open('edit'/'create')
    Modal->>AppComponent: onSave({title, content})
    AppComponent->>SupabaseHelpers: createNote() / updateNote()
    SupabaseHelpers->>SupabaseDB: INSERT/UPDATE notes
    SupabaseDB-->>SupabaseHelpers: confirmation
    SupabaseHelpers-->>AppComponent: new/updated note
    AppComponent->>SupabaseHelpers: fetchNotes()
    SupabaseHelpers->>SupabaseDB: SELECT * FROM notes
    SupabaseDB-->>SupabaseHelpers: updated notes list
    SupabaseHelpers-->>AppComponent: notes array
    User->>AppComponent: Delete note
    AppComponent->>SupabaseHelpers: deleteNote()
    SupabaseHelpers->>SupabaseDB: DELETE FROM notes
    SupabaseDB-->>SupabaseHelpers: confirmation
    SupabaseHelpers-->>AppComponent: -
    AppComponent->>SupabaseHelpers: fetchNotes()
```

## Supabase Integration Diagram (Mermaid)

```mermaid
flowchart LR
    App["App.js"]
    SupabaseHelpers["supabase.js<br/>- fetchNotes<br/>- createNote<br/>- updateNote<br/>- deleteNote"]
    SupabaseService["Supabase Service (Cloud API)"]
    DB["PostgreSQL (notes table)"]

    App -- Calls CRUD helpers --> SupabaseHelpers
    SupabaseHelpers -- HTTP REST/RPC --> SupabaseService
    SupabaseService -- SQL --> DB
```
