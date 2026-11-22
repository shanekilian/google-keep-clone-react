import { useEffect } from "react";
import "./Sidebar.css";

function Sidebar({ activeTab, setActiveTab, shake }) {
  useEffect(() => {
    if (!shake) return;
    const item = document.querySelector(
      `[data-sidebar-target="${shake.target}"]`,
    );
    if (!item) return;

    item.classList.remove("shake");
    void item.offsetWidth;
    item.classList.add("shake");
  }, [shake]);

  return (
    <aside>
      <nav className="sidebar">
        <div className="sidebar-items">
          <div
            className={`sidebar-item ${activeTab === "notes" ? "active" : ""}`}
            data-sidebar-target="notes"
            onClick={() => setActiveTab("notes")}
          >
            <i className="material-symbols-outlined">lightbulb_2</i>
            <span>Notes</span>
          </div>
          <div className="sidebar-item">
            <i className="material-symbols-outlined">add_alert</i>
            <span>Reminder</span>
          </div>
          <div className="sidebar-item">
            <i className="material-symbols-outlined">edit</i>
            <span>Edit Labels</span>
          </div>
          <div
            className={`sidebar-item ${activeTab === "archive" ? "active" : ""}`}
            data-sidebar-target="archive"
            onClick={() => setActiveTab("archive")}
          >
            <i className="material-symbols-outlined">archive</i>
            <span>Archive</span>
          </div>
          <div className="sidebar-item">
            <i className="material-symbols-outlined">delete</i>
            <span>Bin</span>
          </div>
        </div>
        <div className="sidebar-footer">
          <span>Zaio Google Keep Educational Project</span>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
