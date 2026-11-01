import { useState, useRef, useEffect } from "react";
import "./NoteCard.css";

function NoteCard({ note, deleteNote, toggleArchive, togglePin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="note-card">
      <div className="card-checkbox">
        <i className="material-icons-outlined">check_circle</i>
      </div>
      <div className="card-pin" onClick={() => togglePin(note.id)}>
        <i className="material-icons-outlined">push_pin</i>
      </div>

      <h3>{note.title}</h3>
      <p>{note.body}</p>

      <div className="card-toolbar">
        <i className="material-icons-outlined">palette</i>
        <i className="material-icons-outlined">notification_add</i>
        <i className="material-icons-outlined">person_add</i>
        <i className="material-icons-outlined">image</i>
        <i
          className="material-icons-outlined"
          onClick={() => toggleArchive(note.id)}
        >
          {note.archived ? "unarchive" : "archive"}
        </i>
        <i
          className="material-icons-outlined"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          more_vert
        </i>
      </div>

      {menuOpen && (
        <div className="options-modal" ref={menuRef}>
          <div
            className="option-item"
            onClick={() => {
              deleteNote(note.id);
              setMenuOpen(false);
            }}
          >
            Delete note
          </div>
          <div className="option-item">Add label</div>
          <div className="option-item">Add drawing</div>
          <div className="option-item">Make a copy</div>
          <div className="option-item">Show tick boxes</div>
          <div className="option-item">Copy to Google Docs</div>
          <div className="option-item">Version history</div>
        </div>
      )}
    </div>
  );
}

export default NoteCard;
