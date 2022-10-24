import React, { useState } from "react";
import Note from "./Note";

const MyNotes = (props) => {
  const { notes, user, toggleImportanceOf, handleEditNote, handleRemoveNote } =
    props;
  const userNotes = notes.filter((note) => {
    return note?.user?.username === user.username;
  });

  return (
    <div>
      My notes will be here
      {userNotes.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          handleRemoveNote={() => handleRemoveNote(note.id)}
          handleEditNote={handleEditNote}
          user={user}
        >
          {" "}
          {note.content}
        </Note>
      ))}
    </div>
  );
};

export default MyNotes;
