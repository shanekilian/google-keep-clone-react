import "./NotesGrid.css";
import NoteCard from "./NoteCard";

function NotesGrid({ notes, deleteNote, toggleArchive, togglePin }) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          toggleArchive={toggleArchive}
          togglePin={togglePin}
        />
      ))}
    </div>
  );
}

export default NotesGrid;
