import "./Navbar.css";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("chatUser"));

  const handleLogout = () => {
    localStorage.removeItem("chatUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div
        className="navbar-logo"
        onClick={() => navigate("/chat")}
      >
        ChatApp
      </div>

      <div className="navbar-right">

        {user && (
          <span className="navbar-user">
            Hi, {user.name}
          </span>
        )}

        <button
          className="navbar-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;