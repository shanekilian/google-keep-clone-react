import "./Navbar.css";
import keepLogo from "../assets/google-keep-logo.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState, useRef, useEffect } from "react";

export const Navbar = ({ onMenuClick }) => {
  const [searchActive, setSearchActive] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!searchActive) return;

    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchActive]);

  return (
    <header>
      <nav className={`top-navbar ${searchActive ? "search-active" : ""}`}>
        <div className="top-navbar-left" id="topNavbarLeft">
          <Tippy content="Main menu" delay={[200, 0]}>
            <i
              className="material-symbols-outlined"
              title="Main menu"
              onClick={onMenuClick}
            >
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

        <div className="top-navbar-centre" id="topNavbarCentre" ref={searchRef}>
          <Tippy content="Search" delay={[200, 0]}>
            <i
              className="material-symbols-outlined"
              title="Search"
              onClick={() => setSearchActive((prev) => !prev)}
            >
              {searchActive ? "arrow_back" : "search"}
            </i>
          </Tippy>
          <input type="search" placeholder="Search" id="searchInput" />
        </div>

        <div className="top-navbar-right">
          <Tippy content="Refresh" delay={[200, 0]}>
            <i className="material-symbols-outlined" title="Refresh">
              refresh
            </i>
          </Tippy>
          <Tippy content="List View" delay={[200, 0]}>
            <i className="material-symbols-outlined" title="List View">
              view_agenda
            </i>
          </Tippy>
          <Tippy content="Settings" delay={[200, 0]}>
            <i className="material-symbols-outlined" title="Settings">
              settings
            </i>
          </Tippy>
          <Tippy content="Google Apps" delay={[200, 0]}>
            <i className="material-symbols-outlined" title="Google Apps">
              apps
            </i>
          </Tippy>
          <Tippy content="Google Account" delay={[200, 0]}>
            <i className="material-symbols-outlined" title="Google Account">
              account_circle
            </i>
          </Tippy>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
