import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import { Button, Typography, TextField, Box } from "@mui/material";
import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {


    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date(),
      important: false,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
      )
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleRemoveNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const handleEditNote = (id, noteObject) => {
    noteService.update(id, noteObject).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Typography variant="h2">Notes</Typography>
        <Notification message={errorMessage} />
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

        <Box
          component="form"
          onSubmit={addNote}
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
          />
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            save
          </Button>
        </Box>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
