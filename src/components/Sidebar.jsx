import "./Sidebar.css";

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside>
      <nav className="sidebar">
        <div className="sidebar-items">
          <div
            className={`sidebar-item ${activeTab === "notes" ? "active" : ""}`}
            onClick={() => setActiveTab("notes")}
          >
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
          <div
            className={`sidebar-item ${activeTab === "archive" ? "active" : ""}`}
            onClick={() => setActiveTab("archive")}
          >
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
}

export default Sidebar;
