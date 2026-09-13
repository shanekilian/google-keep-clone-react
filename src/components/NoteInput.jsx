import "./NoteInput.css";
import { useState } from "react";

function NoteInput() {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="note-form">
      <p>it will go here</p>
      <button onClick={() => setIsOpen(false)}>close</button>
    </div>
  );
}
export default NoteInput;
