import "./ChatHeader.css";

import { useNavigate } from "react-router-dom";

function ChatHeader({ user }) {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <div className="chat-header">

      {/* Back button - mobile */}
      <button
        className="chat-back-btn"
        onClick={() => navigate("/chat")}
      >
        ←
      </button>

      {/* User Avatar */}

      <div className="header-avatar">
        {user.name?.charAt(0).toUpperCase()}
        <span className="header-online-dot"></span>
      </div>


      {/* User Information */}

      <div className="header-user-info">

        <h3>
          {user.name}
        </h3>

        <p>
          <span className="online-text">
            ●
          </span>
          Online
        </p>

      </div>


      {/* Header Actions */}

      <div className="header-actions">

        <button
          className="header-action-btn"
          title="Search"
          onClick={() =>
            alert("Chat search will be added later.")
          }
        >
          🔍
        </button>

        <button
          className="header-action-btn"
          title="More"
          onClick={() =>
            alert("More options")
          }
        >
          ⋮
        </button>

      </div>

    </div>
  );
}

export default ChatHeader;