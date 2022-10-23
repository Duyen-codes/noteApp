import React from "react";
import { Button, Typography } from "@mui/material";
import Note from "./Note";
import Notification from "./Notification";
import NoteForm from "./NoteForm";

const NoteList = (props) => {
  const {
    notesToShow,
    user,
    addNote,
    errorMessage,
    handleEditNote,
    handleRemoveNote,
    toggleImportanceOf,
    showAll,
    setShowAll,
  } = props;
  return (
    <div>
      <Typography variant="h2">Notes</Typography>
      <Notification message={errorMessage} />
      {user && (
        <div>
          <p>{user.name} logged-in</p>
          {<NoteForm addNote={addNote} />}
        </div>
      )}

      <div>
        <Button
          onClick={() => setShowAll(!showAll)}
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          show {showAll ? "important" : "all"}
        </Button>
      </div>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              handleRemoveNote={() => handleRemoveNote(note.id)}
              handleEditNote={handleEditNote}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default NoteList;
