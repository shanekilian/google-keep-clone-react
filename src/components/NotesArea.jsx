import "./NotesArea.css";
import NoteInput from "./NoteInput";
import NotesGrid from "./NotesGrid";

function NotesArea({ notes, addNote }) {
  return (
    <main>
      <NoteInput addNote={addNote} />

      {notes.length === 0 ? (
        <div className="note-dashboard">
          <i className="material-icons-outlined">lightbulb</i>
          <span>Notes that you add appear here</span>
        </div>
      ) : (
        <NotesGrid notes={notes} />
      )}
    </main>
  );
}

export default NotesArea;
