import "./NoteInput.css";
import { useState, useRef, useEffect } from "react";

function NoteInput({ addNote }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const formRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const moreRef = useRef(null);

  function saveAndClose() {
    if (title.trim() !== "" || body.trim() !== "") {
      addNote({ title, body });
    }
    setTitle("");
    setBody("");
    setIsOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        saveAndClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, title, body]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event) {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  if (!isOpen) {
    return (
      <div className="note-bar" key="bar" onClick={() => setIsOpen(true)}>
        <div className="note-input">
          <input type="text" placeholder="Take a note..." readOnly />
        </div>
        <div className="note-input-icons">
          <i className="material-icons-outlined">check_box</i>
          <i className="material-icons-outlined">brush</i>
          <i className="material-icons-outlined">image</i>
        </div>
      </div>
    );
  }

  return (
    <div className="note-form" key="form" ref={formRef}>
      <div className="note-form-top">
        <input
          type="text"
          placeholder="Title"
          className="note-form-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <i className="material-icons-outlined">push_pin</i>
      </div>

      <textarea
        placeholder="Take a note..."
        className="note-form-body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="note-form-toolbar">
        <div className="note-form-toolbar-left">
          <i className="material-icons-outlined">format_color_text</i>
          <i className="material-icons-outlined">palette</i>
          <i className="material-icons-outlined">notification_add</i>
          <i className="material-icons-outlined">person_add</i>
          <i className="material-icons-outlined">image</i>
          <i className="material-icons-outlined">archive</i>
          <div className="form-more" ref={moreRef}>
            <i
              className={`material-icons-outlined ${menuOpen ? "menu-open" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              more_vert
            </i>

            {menuOpen && (
              <div className="options-modal">
                <div className="option-item">Delete note</div>
                <div className="option-item">Add label</div>
                <div className="option-item">Add drawing</div>
                <div className="option-item">Make a copy</div>
                <div className="option-item">Show tick boxes</div>
                <div className="option-item">Copy to Google Docs</div>
                <div className="option-item">Version history</div>
              </div>
            )}
          </div>
          <i className="material-icons-outlined">undo</i>
          <i className="material-icons-outlined">redo</i>
        </div>
        <button onClick={saveAndClose}>Close</button>
      </div>
    </div>
  );
}

export default NoteInput;
