import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import SaveIcon from "@mui/icons-material/Save";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

const Note = (props) => {
  const { note, toggleImportance, handleRemoveNote, handleEditNote, user } =
    props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedNoteContent, setEditedNoteContent] = useState(note.content);

  const handleClickSave = (note) => {
    const editedNoteObject = {
      ...note,
      content: editedNoteContent,
      date: note.date,
      important: note.important,
    };

    handleEditNote(note.id, editedNoteObject);
    setIsEditing(false);
  };
  return (
    <li
      className="note"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {note.important ? (
        <Tooltip title="unmark important">
          <IconButton onClick={toggleImportance} sx={{ color: "#ffc107" }}>
            <StarIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="mark important">
          <IconButton onClick={toggleImportance}>
            <StarBorderIcon />
          </IconButton>
        </Tooltip>
      )}

      {isEditing ? (
        <>
          <TextField
            sx={{ width: "100%", marginRight: "5px" }}
            id="outlined-basic"
            label="Note Content"
            variant="outlined"
            value={editedNoteContent}
            onChange={(e) => setEditedNoteContent(e.target.value)}
          />
          <Button
            sx={{ m: 0.5, backgroundColor: "#ffc107" }}
            size="large"
            onClick={() => handleClickSave(note)}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button
            sx={{ m: 0.5, backgroundColor: "#ff5722" }}
            size="large"
            onClick={() => setIsEditing(!isEditing)}
            variant="contained"
            color="primary"
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <span>{note.content}</span>
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => setIsEditing(!isEditing)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton onClick={handleRemoveNote}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </li>
  );
};

export default Note;
