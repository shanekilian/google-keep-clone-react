import { useEffect, useRef } from "react";
import "./FlyingNote.css";

function FlyingNote({ flight, onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const target = document.querySelector(
      `[data-sidebar-target="${flight.target}"]`,
    );
    const destination = target?.getBoundingClientRect();
    const { rect } = flight;

    const dx = destination
      ? destination.left + destination.width / 2 - (rect.left + rect.width / 2)
      : 0;
    const dy = destination
      ? destination.top + destination.height / 2 - (rect.top + rect.height / 2)
      : -60;

    const animation = card.animate(
      [
        { transform: "translate(0px, 0px) scale(1)", opacity: 1 },
        {
          transform: `translate(${dx * 0.65}px, ${dy * 0.65}px) scale(0.45)`,
          opacity: 1,
          offset: 0.4,
        },
        {
          transform: `translate(${dx}px, ${dy}px) scale(0.08)`,
          opacity: 0,
        },
      ],
      {
        duration: 700,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
      },
    );

    let stopped = false;
    animation.onfinish = () => {
      if (!stopped) onDone(flight.id, flight.target);
    };

    return () => {
      stopped = true;
      animation.cancel();
    };
  }, [flight, onDone]);

  return (
    <div
      ref={ref}
      className="note-card flying-note"
      aria-hidden="true"
      style={{
        top: flight.rect.top,
        left: flight.rect.left,
        width: flight.rect.width,
        height: flight.rect.height,
      }}
    >
      <div className="card-checkbox">
        <i className="material-symbols-outlined">check_circle</i>
      </div>
      <div className={`card-pin ${flight.pinned ? "pinned" : ""}`}>
        <i className="material-symbols-outlined">push_pin</i>
      </div>

      <h3>{flight.title}</h3>
      <p>{flight.body}</p>

      <div className="card-toolbar">
        <i className="material-symbols-outlined">palette</i>
        <i className="material-symbols-outlined">notification_add</i>
        <i className="material-symbols-outlined">person_add</i>
        <i className="material-symbols-outlined">image</i>
        <i className="material-symbols-outlined">
          {flight.target === "notes" ? "unarchive" : "archive"}
        </i>
        <div className="card-more">
          <i className="material-symbols-outlined">more_vert</i>
        </div>
      </div>
    </div>
  );
}

export default FlyingNote;
