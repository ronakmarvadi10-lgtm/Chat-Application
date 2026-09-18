import "./Sidebar.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({
  currentUser,
  onSelectUser,
  selectedUser,
}) {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [chatMessages, setChatMessages] = useState({});

  useEffect(() => {
    const registeredUsers =
      JSON.parse(
        localStorage.getItem("chatUsers")
      ) || [];

    const otherUsers = registeredUsers.filter(
      (user) => user.id !== currentUser?.id
    );

    setUsers(otherUsers);

    const savedMessages =
      JSON.parse(
        localStorage.getItem("chatMessages")
      ) || {};

    setChatMessages(savedMessages);
  }, [currentUser]);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedMessages =
        JSON.parse(
          localStorage.getItem("chatMessages")
        ) || {};

      setChatMessages(savedMessages);
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  const getConversationId = (user) => {
    return [currentUser.id, user.id]
      .sort()
      .join("_");
  };

  const getLastMessage = (user) => {
    const conversationId =
      getConversationId(user);

    const messages =
      chatMessages[conversationId] || [];

    if (messages.length === 0) {
      return {
        text: "Start a conversation...",
        time: "",
      };
    }

    const lastMessage =
      messages[messages.length - 1];

    return {
      text: lastMessage.text,
      time: lastMessage.time,
    };
  };

  const filteredUsers = users.filter((user) =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("chatUser");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      {/* PROFILE */}
      <div className="sidebar-profile">
        <div className="profile-info">

          <div className="profile-avatar">
            {currentUser?.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="profile-text">
            <h3>{currentUser?.name}</h3>
            <span>Online</span>
          </div>

        </div>

        <button
          className="profile-btn"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      </div>

      {/* SEARCH */}
      <div className="chat-search">

        <span className="search-symbol">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* HEADER */}
      <div className="chat-list-header">

        <h3>Messages</h3>

        <span>
          {filteredUsers.length}
        </span>

      </div>

      {/* USERS */}
      <div className="users-list">

        {filteredUsers.length === 0 ? (
          <div className="no-users">

            <div>👥</div>

            <p>
              No conversations found
            </p>

          </div>
        ) : (
          filteredUsers.map((user) => {

            const lastMessage =
              getLastMessage(user);

            return (
              <div
                key={user.id}
                className={
                  selectedUser?.id === user.id
                    ? "user-item active-user"
                    : "user-item"
                }
                onClick={() =>
                  onSelectUser(user)
                }
              >

                {/* AVATAR */}
                <div className="user-avatar">

                  {user.name
                    ?.charAt(0)
                    .toUpperCase()}

                  <span className="online-dot"></span>

                </div>

                {/* USER INFO */}
                <div className="user-info">

                  <div className="user-name-row">

                    <h4>
                      {user.name}
                    </h4>

                    {lastMessage.time && (
                      <span className="user-time">
                        {lastMessage.time}
                      </span>
                    )}

                  </div>

                  <p>
                    {lastMessage.text}
                  </p>

                </div>

              </div>
            );
          })
        )}

      </div>

      {/* BOTTOM */}
      <div className="sidebar-bottom">

        <button
          onClick={() =>
            navigate("/settings")
          }
        >
          ⚙ Settings
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          ⇥ Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;