import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./NoteCard.css";

const ROW_UNIT = 1;
const GAP = 8;

function NoteCard({ note, deleteNote, onArchiveRequest, togglePin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    function updateSpan() {
      const height = card.getBoundingClientRect().height;
      card.style.gridRowEnd = `span ${Math.ceil((height + GAP) / ROW_UNIT)}`;
    }

    updateSpan();
    const observer = new ResizeObserver(updateSpan);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

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

  function handleArchiveClick(event) {
    const card = event.currentTarget.closest("[data-note-id]");
    onArchiveRequest(note, card.getBoundingClientRect());
  }

  return (
    <div
      ref={cardRef}
      className={`note-card ${menuOpen ? "menu-open" : ""}`}
      data-note-id={note.id}
    >
      <div className="card-checkbox">
        <i className="material-symbols-outlined">check_circle</i>
      </div>

      <div
        className={`card-pin ${note.pinned ? "pinned" : ""}`}
        onClick={() => togglePin(note.id)}
      >
        <i className="material-symbols-outlined">push_pin</i>
      </div>

      <h3>{note.title}</h3>
      <p>{note.body}</p>

      <div className="card-toolbar">
        <i className="material-symbols-outlined">palette</i>
        <i className="material-symbols-outlined">notification_add</i>
        <i className="material-symbols-outlined">person_add</i>
        <i className="material-symbols-outlined">image</i>
        <i className="material-symbols-outlined" onClick={handleArchiveClick}>
          {note.archived ? "unarchive" : "archive"}
        </i>

        <div className="card-more" ref={menuRef}>
          <i
            className="material-symbols-outlined"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            more_vert
          </i>

          {menuOpen && (
            <div className="options-modal">
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
      </div>
    </div>
  );
}

export default NoteCard;
