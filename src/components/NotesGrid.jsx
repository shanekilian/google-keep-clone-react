import "./NotesGrid.css";
import NoteCard from "./NoteCard";

function NotesGrid({ notes }) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NotesGrid;
