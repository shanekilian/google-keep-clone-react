import "./App.css";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NotesArea from "./components/NotesArea";
import FlyingNote from "./components/FlyingNote";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function App() {
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState("notes");
  const [flights, setFlights] = useState([]);
  const [shake, setShake] = useState(null);
  const [sortAZ, setSortAZ] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const flipSnapshot = useRef(null);
  const finishedFlights = useRef(new Set());

  function capturePositions() {
    if (prefersReducedMotion()) {
      flipSnapshot.current = null;
      return;
    }

    const positions = new Map();
    document.querySelectorAll("[data-note-id]").forEach((element) => {
      const box = element.getBoundingClientRect();
      positions.set(element.dataset.noteId, {
        left: box.left,
        top: box.top,
      });
    });
    flipSnapshot.current = positions;
  }

  // FLIP: capturePositions() recorded where every card was. After React has
  // moved the cards, we measure where they are now and play a short animation
  // from the old spot to the new one. Cards are matched by id, so it also
  // works when a card jumps between the Pinned and Others groups.
  useLayoutEffect(() => {
    const previous = flipSnapshot.current;
    if (!previous) return;
    flipSnapshot.current = null;

    const cards = document.querySelectorAll("[data-note-id]");

    // If an earlier glide is still running, stop it first so we measure each
    // card's real layout position (otherwise overlapping actions would jump).
    cards.forEach((card) =>
      card.getAnimations().forEach((animation) => animation.cancel()),
    );

    cards.forEach((card) => {
      const first = previous.get(card.dataset.noteId);
      if (!first) return;

      const last = card.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

      card.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)`, zIndex: 3 },
          { transform: "translate(0px, 0px)", zIndex: 3 },
        ],
        { duration: 550, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
      );
    });
  }, [notes, flights, sortAZ]);

  function addNote(note) {
    capturePositions();
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: crypto.randomUUID(), archived: false, pinned: false, ...note },
    ]);
  }

  function deleteNote(id) {
    capturePositions();
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function togglePin(id) {
    capturePositions();
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note,
      ),
    );
  }

  function toggleSort() {
    capturePositions();
    setSortAZ((prev) => !prev);
  }

  function beginArchiveToggle(note, rect) {
    if (flights.some((flight) => flight.id === note.id)) return;

    if (prefersReducedMotion()) {
      setNotes((prevNotes) =>
        prevNotes.map((item) =>
          item.id === note.id ? { ...item, archived: !item.archived } : item,
        ),
      );
      return;
    }

    finishedFlights.current.delete(note.id);
    capturePositions();
    setFlights((prevFlights) => [
      ...prevFlights,
      {
        id: note.id,
        title: note.title,
        body: note.body,
        pinned: note.pinned,
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
        target: note.archived ? "notes" : "archive",
      },
    ]);
  }

  const completeFlight = useCallback((id, target) => {
    if (finishedFlights.current.has(id)) return;
    finishedFlights.current.add(id);

    setFlights((prevFlights) =>
      prevFlights.filter((flight) => flight.id !== id),
    );
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note,
      ),
    );
    setShake({ target, nonce: Date.now() });
  }, []);

  const hiddenIds = flights.map((flight) => flight.id);

  return (
    <div className="app">
      <Navbar onMenuClick={() => setMobileSidebarOpen((prev) => !prev)} />
      <div className="content-wrapper">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          shake={shake}
          mobileOpen={mobileSidebarOpen}
        />
        <NotesArea
          notes={notes}
          activeTab={activeTab}
          addNote={addNote}
          deleteNote={deleteNote}
          togglePin={togglePin}
          sortAZ={sortAZ}
          onToggleSort={toggleSort}
          onArchiveRequest={beginArchiveToggle}
          hiddenIds={hiddenIds}
        />
      </div>
      {createPortal(
        flights.map((flight) => (
          <FlyingNote key={flight.id} flight={flight} onDone={completeFlight} />
        )),
        document.body,
      )}
    </div>
  );
}

export default App;
