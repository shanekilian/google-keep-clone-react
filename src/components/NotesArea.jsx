import "./NotesArea.css";
import NoteInput from "./NoteInput";

function NotesArea({ notes }) {
  return (
    <main>
      <NoteInput />

      {notes.length === 0 && (
        <div className="note-dashboard">
          <i className="material-icons-outlined">lightbulb</i>
          <span>Notes that you add appear here</span>
        </div>
      )}
    </main>
  );
}
export default NotesArea;
