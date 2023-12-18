import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./img/favicon.ico";

const Sidebar = () => {
  const logo = "./src/resource/Logo_pti.png";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    // Redirect to home after logout
    window.location.href = "/";
  };

  const isAuthenticated = () => {
    return localStorage.getItem("currentUser") !== null;
  };

  const isLoggedIn = isAuthenticated();
  const isLoggedOff = !isAuthenticated();

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="logo-details" id="logoDetails">
        <div className="background-image"></div>
        <i>
          <img
            src={Logo} // Use your logo variable here
            alt="Logo"
            className="logo hidden-logo"
            width="20px"
          />
        </i>
        <div className="logo_name">WeatherCheckHub</div>
        <i
          className={`bx ${isSidebarOpen ? "bx-menu-alt-right" : "bx-menu"}`}
          id="btn"
          onClick={toggleSidebar}
        ></i>
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/home">
            <i className="bx bxs-cloud-lightning"></i>
            <span className="links_name">Weather</span>
          </Link>
          <span className="tooltip">Weather</span>
        </li>

        <li>
          <Link to="/notes">
            <i className="bx bx-chat"></i>
            <span className="links_name">Notes</span>
          </Link>
          <span className="tooltip">Notes</span>
        </li>

        <li>
          <Link to="/about">
            <i className="bx bx-chat"></i>
            <span className="links_name">About</span>
          </Link>
          <span className="tooltip">About</span>
        </li>

        {isLoggedOff && (
          <li key="login">
            <Link to="/">
              <i className="bx bx-user"></i>
              <span className="links_name">Login</span>
            </Link>
            <span className="tooltip">Login</span>
          </li>
        )}

        {isLoggedIn && (
          <li key="logout" onClick={handleLogout}>
            <Link to="/">
              <i className="bx bx-log-out"></i>
              <span className="links_name">Logout</span>
            </Link>
            <span className="tooltip">Logout</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
