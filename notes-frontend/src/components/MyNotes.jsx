import React, { useState, useEffect } from "react";
import Note from "./Note";

const MyNotes = (props) => {
  const { notes, user, toggleImportanceOf, handleEditNote, handleRemoveNote } =
    props;
  const [visible, setVisible] = useState(true);

  const myNotes = notes.filter((note) => {
    if (
      note?.user?.username === user?.username ||
      note?.user === user?.userId
    ) {
      return note;
    }

    return;
  });

  return (
    <div>
      <h2
        style={{ textAlign: "center", fontSize: "2.5rem", marginBlock: "2rem" }}
      >
        My notes will be here
      </h2>
      <ul id="my-notes">
        {myNotes.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              handleRemoveNote={() => handleRemoveNote(note.id)}
              handleEditNote={handleEditNote}
              user={user}
              visible={visible}
            >
              {" "}
              {note.content}
            </Note>
          );
        })}
      </ul>
    </div>
  );
};

export default MyNotes;
