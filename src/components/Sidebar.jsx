import React from "react";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside>
      <nav class="sidebar">
        <div class="sidebar-items">
          <div class="sidebar-item active" id="notesTab">
            <i class="material-icons-outlined">lightbulb</i>
            <span>Notes</span>
          </div>
          <div class="sidebar-item">
            <i class="material-icons-outlined">add_alert</i>
            <span>Reminder</span>
          </div>
          <div class="sidebar-item">
            <i class="material-icons-outlined">edit</i>
            <span>Edit Labels</span>
          </div>
          <div class="sidebar-item" id="archiveTab">
            <i class="material-icons-outlined">archive</i>
            <span>Archive</span>
          </div>
          <div class="sidebar-item">
            <i class="material-icons-outlined">delete</i>
            <span>Bin</span>
          </div>
        </div>
        <div class="sidebar-footer">
          <span>Zaio Google Keep Educational Project</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
