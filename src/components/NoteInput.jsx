import "./NoteInput.css";
import { useState, useRef, useEffect } from "react";

function NoteInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <div className="note-bar" onClick={() => setIsOpen(true)}>
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
    <div className="note-form" ref={formRef}>
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
          <i className="material-icons-outlined">more_vert</i>
          <i className="material-icons-outlined">undo</i>
          <i className="material-icons-outlined">redo</i>
        </div>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
}

export default NoteInput;
