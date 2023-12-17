import { Link, NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <>
      <div class="sidebar">
        <div class="logo-details" id="logoDetails">
          <div class="background-image"></div>
          <i>
            <img
              src="./resource/Logo_pti.png"
              alt="logo"
              class="logo hidden-logo"
              width="20px"
            />
          </i>
          <div class="logo_name">WeatherCheckHub</div>
          <i class="bx bx-menu" id="btn"></i>
        </div>
        <ul class="nav-list">
          <li>
            <Link to="/home">
              <i class="bx bxs-cloud-lightning"></i>
              <span class="links_name">Weather</span>
            </Link>
            <span class="tooltip">Weather</span>
          </li>
          <li>
            <Link to="/">
              <i class="bx bx-user"></i>
              <span class="links_name">User</span>
            </Link>
            <span class="tooltip">User</span>
          </li>
          <li>
            <Link to="/notes">
              <i class="bx bx-chat"></i>
              <span class="links_name">Notes</span>
            </Link>
            <span class="tooltip">Notes</span>
          </li>
        </ul>
      </div>
    </>
  );
}
