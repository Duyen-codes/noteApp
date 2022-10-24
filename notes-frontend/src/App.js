import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import loginService from "./services/login";
import registerService from "./services/register";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm.jsx";
import NoteList from "./components/NoteList";
import MyNotes from "./components/MyNotes.jsx";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (newNote) => {
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: false,
    };

    noteService.create(noteObject).then((returnedNote) => {
      console.log("returnedNote from backend", returnedNote);
      setNotes(notes.concat(returnedNote));
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        console.log("returnedNote", returnedNote);
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
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
    setNotes(notes.filter((note) => note.id !== id));
    noteService.remove(id).then();
  };

  // handle edit a note
  const handleEditNote = (id, changedNote) => {
    noteService.update(id, changedNote).then((returnedNote) => {
      console.log("returnedNote", returnedNote);
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  // handle Login
  const handleLogin = async (username, password) => {
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });
      console.log("user", user);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // handle Logout

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
    navigate("/");
  };

  // handle register new user
  const handleRegister = async (username, name, password) => {
    console.log("registering with", username, name, password);
    try {
      const newUser = await registerService.register({
        username,
        name,
        password,
      });
      setErrorMessage("Register success");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      navigate("/");
    } catch (exception) {
      setErrorMessage("Something went wrong");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="App">
      <Nav user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notesToShow={notesToShow}
              user={user}
              addNote={addNote}
              errorMessage={errorMessage}
              handleEditNote={handleEditNote}
              handleRemoveNote={handleRemoveNote}
              toggleImportanceOf={toggleImportanceOf}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          }
        ></Route>
        <Route
          path="/register"
          element={<RegisterForm handleRegister={handleRegister} />}
        ></Route>
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        ></Route>{" "}
        {user && (
          <Route
            path="/mynotes"
            element={
              <MyNotes
                notes={notes}
                user={user}
                handleEditNote={handleEditNote}
                handleRemoveNote={handleRemoveNote}
                toggleImportanceOf={toggleImportanceOf}
              />
            }
          ></Route>
        )}
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
