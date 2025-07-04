//
// Supabase client initialization & notes CRUD helpers for the notes app.
//

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://qgmcdylmdodofjpuuklq.supabase.co';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbWNkeWxtZG9kb2ZqcHV1a2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNjkzMzAsImV4cCI6MjA2Njc0NTMzMH0.Q3dbZtBZOZXwPL73kF1TR-asuum7vAcBMqbo-ihaN7k';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Note object shape:
 * {
 *   id: string,
 *   title: string,
 *   content: string,
 *   created_at: string,
 *   updated_at: string
 * }
 */

// PUBLIC_INTERFACE
/** Fetch all notes, sorted by updated_at desc. */
export async function fetchNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// PUBLIC_INTERFACE
/** Create a new note */
export async function createNote({ title, content }) {
  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, content }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
/** Update a note by ID */
export async function updateNote(id, { title, content }) {
  const { data, error } = await supabase
    .from('notes')
    .update({ title, content })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
/** Delete a note by ID */
export async function deleteNote(id) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
