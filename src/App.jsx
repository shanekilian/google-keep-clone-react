import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NotesArea from "./components/NotesArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState("notes");

  function addNote(note) {
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: crypto.randomUUID(), archived: false, pinned: false, ...note },
    ]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function toggleArchive(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note,
      ),
    );
  }

  function togglePin(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note,
      ),
    );
  }

  return (
    <div className="app">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <NotesArea
          notes={notes}
          activeTab={activeTab}
          addNote={addNote}
          deleteNote={deleteNote}
          toggleArchive={toggleArchive}
          togglePin={togglePin}
        />
      </div>
    </div>
  );
}

export default App;
