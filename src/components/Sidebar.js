import { Link, NavLink,useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar() {


  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/"); // Redirect to login page after logout
  };

  const isAuthenticated = () => {
    return localStorage.getItem("currentUser") !== null;
  };

  const isLoggedIn = isAuthenticated();
  const isLoggedOff =! isAuthenticated();
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
            <Link to="/notes">
              <i class="bx bx-chat"></i>
              <span class="links_name">Notes</span>
            </Link>
            <span class="tooltip">Notes</span>
          </li>

          {isLoggedOff && (
          <li>
            <Link to="/">
              <i class="bx bx-user"></i>
              <span class="links_name">User</span>
            </Link>
            <span class="tooltip">Login</span>
          </li>)}

          {isLoggedIn && (
          <li onClick={handleLogout}>
            <Link to="/">
            
              <i class="bx bx-log-out"></i>
              <span class="links_name">Logout</span>
            
            </Link>
            <span class="tooltip">Logout</span>
          </li>
          )}
        </ul>
      </div>
      
    </>
  );
}