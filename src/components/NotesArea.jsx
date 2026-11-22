import "./NotesArea.css";
import NoteInput from "./NoteInput";
import NotesGrid from "./NotesGrid";

function NotesArea({
  notes,
  activeTab,
  addNote,
  deleteNote,
  togglePin,
  sortNotesByTitle,
  onArchiveRequest,
  hiddenIds,
}) {
  const hidden = new Set(hiddenIds);
  const visibleNotes = notes.filter((note) => {
    if (hidden.has(note.id)) return false;
    return activeTab === "archive" ? note.archived : !note.archived;
  });
  const pinnedNotes = visibleNotes.filter((note) => note.pinned);
  const otherNotes = visibleNotes.filter((note) => !note.pinned);
  const isDeparting = hiddenIds.length > 0;

  return (
    <main>
      {activeTab === "notes" && <NoteInput addNote={addNote} />}

      {visibleNotes.length > 0 && (
        <div className="notes-toolbar">
          <button
            type="button"
            className="sort-button"
            onClick={sortNotesByTitle}
          >
            <i className="material-symbols-outlined">sort_by_alpha</i>
            <span>Sort A–Z</span>
          </button>
        </div>
      )}

      {visibleNotes.length === 0 ? (
        isDeparting ? null : (
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
        )
      ) : (
        <>
          {pinnedNotes.length > 0 && (
            <>
              <h2 className="notes-section-title">Pinned</h2>
              <NotesGrid
                notes={pinnedNotes}
                deleteNote={deleteNote}
                onArchiveRequest={onArchiveRequest}
                togglePin={togglePin}
              />
            </>
          )}
          {otherNotes.length > 0 && (
            <>
              {pinnedNotes.length > 0 && (
                <h2 className="notes-section-title">Others</h2>
              )}
              <NotesGrid
                notes={otherNotes}
                deleteNote={deleteNote}
                onArchiveRequest={onArchiveRequest}
                togglePin={togglePin}
              />
            </>
          )}
        </>
      )}
    </main>
  );
}

export default NotesArea;
