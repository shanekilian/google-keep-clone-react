import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NotesArea from "./components/NotesArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: crypto.randomUUID(), ...note },
    ]);
  }

  return (
    <div>
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <NotesArea notes={notes} addNote={addNote} />
      </div>
    </div>
  );
}

export default App;
