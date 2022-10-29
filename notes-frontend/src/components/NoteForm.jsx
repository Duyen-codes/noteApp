import React, { useState } from "react";
import { Button, Typography, TextField, Box } from "@mui/material";

const NoteForm = (props) => {
  const { addNote } = props;
  const [newNote, setNewNote] = useState("");

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(newNote);
    setNewNote("");
  };
  return (
    <Box
      className="formDiv"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        width: "300px",
      }}
    >
      <Typography variant="h4">Add new note</Typography>
      <TextField
        size="small"
        type="text"
        label="Note content"
        required
        autoFocus
        value={newNote}
        onChange={handleNoteChange}
        placeholder="write note content here"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, backgroundColor: "rgb(81 117 255)" }}
      >
        save
      </Button>
    </Box>
  );
};

export default NoteForm;
