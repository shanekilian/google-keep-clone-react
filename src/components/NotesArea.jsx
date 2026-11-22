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
  const pinnedNotes = visibleNotes.filter((note) => note.pinned);
  const otherNotes = visibleNotes.filter((note) => !note.pinned);

  return (
    <main>
      {activeTab === "notes" && <NoteInput addNote={addNote} />}

      {visibleNotes.length === 0 ? (
        <div className="note-dashboard">
          <i className="material-symbols-outlined">
            {activeTab === "archive" ? "archive" : "lightbulb"}
          </i>
          <span>
            {activeTab === "archive"
              ? "Your archived notes appear here"
              : "Notes that you add appear here"}
          </span>
        </div>
      ) : (
        <>
          {pinnedNotes.length > 0 && (
            <NotesGrid
              notes={pinnedNotes}
              deleteNote={deleteNote}
              toggleArchive={toggleArchive}
              togglePin={togglePin}
            />
          )}
          {otherNotes.length > 0 && (
            <NotesGrid
              notes={otherNotes}
              deleteNote={deleteNote}
              toggleArchive={toggleArchive}
              togglePin={togglePin}
            />
          )}
        </>
      )}
    </main>
  );
}

export default NotesArea;
