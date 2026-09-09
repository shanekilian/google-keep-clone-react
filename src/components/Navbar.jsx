import "./Navbar.css";
import keepLogo from "../assets/google-keep-logo.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export const Navbar = () => {
  return (
    <header>
      <nav className="top-navbar" id="topNavbar">
        <div className="top-navbar-left" id="topNavbarLeft">
          <Tippy content="Main menu" delay={[200, 0]}>
            <i className="material-icons" title="Main menu">
              menu
            </i>
          </Tippy>
          <Tippy content="Google Keep" delay={[200, 0]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={keepLogo} alt="Google Keep Logo" />
              <span>Keep</span>
            </div>
          </Tippy>
        </div>

        <div className="top-navbar-centre" id="topNavbarCentre">
          <Tippy content="Search" delay={[200, 0]}>
            <i className="material-icons" title="Search" id="searchToggleIcon">
              search
            </i>
          </Tippy>
          <input type="search" placeholder="Search" id="searchInput" />
        </div>

        <div className="top-navbar-right">
          <Tippy content="Refresh" delay={[200, 0]}>
            <i className="material-icons-outlined" title="Refresh">
              refresh
            </i>
          </Tippy>
          <Tippy content="List View" delay={[200, 0]}>
            <i className="material-icons-outlined" title="List View">
              view_agenda
            </i>
          </Tippy>
          <Tippy content="Settings" delay={[200, 0]}>
            <i className="material-icons-outlined" title="Settings">
              settings
            </i>
          </Tippy>
          <Tippy content="Google Apps" delay={[200, 0]}>
            <i className="material-icons-outlined" title="Google Apps">
              apps
            </i>
          </Tippy>
          <Tippy content="Google Account" delay={[200, 0]}>
            <i className="material-icons-outlined" title="Google Account">
              account_circle
            </i>
          </Tippy>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
