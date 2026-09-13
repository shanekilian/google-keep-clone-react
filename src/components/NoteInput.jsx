import "./NoteInput.css";

function NoteInput() {
  return (
    <div className="note-bar">
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

export default NoteInput;
