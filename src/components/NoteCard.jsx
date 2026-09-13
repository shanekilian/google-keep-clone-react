import "./NoteCard.css";

function NoteCard({ note }) {
  return (
    <div className="note-card">
      <div className="card-checkbox">
        <i className="material-icons-outlined">check_circle</i>
      </div>
      <div className="card-pin">
        <i className="material-icons-outlined">push_pin</i>
      </div>

      <h3>{note.title}</h3>
      <p>{note.body}</p>

      <div className="card-toolbar">
        <i className="material-icons-outlined">palette</i>
        <i className="material-icons-outlined">notification_add</i>
        <i className="material-icons-outlined">person_add</i>
        <i className="material-icons-outlined">image</i>
        <i className="material-icons-outlined">archive</i>
        <i className="material-icons-outlined">more_vert</i>
      </div>
    </div>
  );
}

export default NoteCard;
