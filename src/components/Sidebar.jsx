import React from "react";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside>
      <nav className="sidebar">
        <div className="sidebar-items">
          <div className="sidebar-item active" id="notesTab">
            <i className="material-icons-outlined">lightbulb</i>
            <span>Notes</span>
          </div>
          <div className="sidebar-item">
            <i className="material-icons-outlined">add_alert</i>
            <span>Reminder</span>
          </div>
          <div className="sidebar-item">
            <i className="material-icons-outlined">edit</i>
            <span>Edit Labels</span>
          </div>
          <div className="sidebar-item" id="archiveTab">
            <i className="material-icons-outlined">archive</i>
            <span>Archive</span>
          </div>
          <div className="sidebar-item">
            <i className="material-icons-outlined">delete</i>
            <span>Bin</span>
          </div>
        </div>
        <div className="sidebar-footer">
          <span>Zaio Google Keep Educational Project</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
