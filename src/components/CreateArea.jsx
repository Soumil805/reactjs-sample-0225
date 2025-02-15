import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";
import { supabase } from "../supabaseClient";

function CreateArea({ userId, onAdd }) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  }

  async function submitNote(event) {
    event.preventDefault();
    if (!note.title || !note.content) return;

    const { data, error } = await supabase
      .from("Notes")
      .insert([{
        title: note.title,
        content: note.content,
        user_id: userId
      }])
      .select();

    if (error) {
      console.error("Error adding note:", error);
      return;
    }

    onAdd(data[0]);
    setNote({ title: "", content: "" });
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;