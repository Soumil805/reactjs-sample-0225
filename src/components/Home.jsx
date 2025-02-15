import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { supabase } from "../supabaseClient";
import { useUser } from '../context/UserContext';

function Home() {
  const [notes, setNotes] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  async function fetchNotes() {
    const { data, error } = await supabase
      .from("Notes")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching notes:", error);
    } else {
      setNotes(data);
    }
  }

  async function deleteNote(id) {
    const { error } = await supabase
      .from("Notes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting note:", error);
      return;
    }

    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} userId={user.id} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default Home;