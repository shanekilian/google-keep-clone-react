import "./NotesGrid.css";
import NoteCard from "./NoteCard";

function NotesGrid({ notes, deleteNote, onArchiveRequest, togglePin }) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          onArchiveRequest={onArchiveRequest}
          togglePin={togglePin}
        />
      ))}
    </div>
  );
}

export default NotesGrid;
