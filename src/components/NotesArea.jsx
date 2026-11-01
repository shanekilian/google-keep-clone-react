import "./NotesArea.css";
import NoteInput from "./NoteInput";
import NotesGrid from "./NotesGrid";

function NotesArea({
  notes,
  activeTab,
  addNote,
  deleteNote,
  toggleArchive,
  togglePin,
}) {
  const visibleNotes = notes.filter((note) =>
    activeTab === "archive" ? note.archived : !note.archived,
  );

  return (
    <main>
      {activeTab === "notes" && <NoteInput addNote={addNote} />}

      {visibleNotes.length === 0 ? (
        <div className="note-dashboard">
          <i className="material-icons-outlined">
            {activeTab === "archive" ? "archive" : "lightbulb"}
          </i>
          <span>
            {activeTab === "archive"
              ? "Your archived notes appear here"
              : "Notes that you add appear here"}
          </span>
        </div>
      ) : (
        <NotesGrid
          notes={visibleNotes}
          deleteNote={deleteNote}
          toggleArchive={toggleArchive}
          togglePin={togglePin}
        />
      )}
    </main>
  );
}

export default NotesArea;
