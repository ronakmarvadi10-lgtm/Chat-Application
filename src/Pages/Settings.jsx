import "./Settings.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("chatUser");
    navigate("/login");
  };

  return (
    <div className="settings-page">

      <div className="settings-container">

        {/* Header */}

        <div className="settings-header">

          <button
            className="settings-back"
            onClick={() => navigate("/chat")}
          >
            ← Back to Chat
          </button>

          <h1>
            Settings
          </h1>

        </div>


        {/* Settings Card */}

        <div className="settings-card">

          <div className="settings-section">

            <h2>
              General
            </h2>

            <p>
              Manage your ChatApp preferences.
            </p>

          </div>


          {/* Notifications */}

          <div className="setting-item">

            <div className="setting-info">

              <h3>
                Notifications
              </h3>

              <p>
                Receive notifications for new messages.
              </p>

            </div>

            <button
              className={
                notifications
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setNotifications(!notifications)
              }
            >
              <span></span>
            </button>

          </div>


          {/* Message Sound */}

          <div className="setting-item">

            <div className="setting-info">

              <h3>
                Message Sound
              </h3>

              <p>
                Play a sound when receiving messages.
              </p>

            </div>

            <button
              className={
                sound
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setSound(!sound)
              }
            >
              <span></span>
            </button>

          </div>


          {/* Dark Mode */}

          <div className="setting-item">

            <div className="setting-info">

              <h3>
                Dark Mode
              </h3>

              <p>
                Change the appearance of ChatApp.
              </p>

            </div>

            <button
              className={
                darkMode
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              <span></span>
            </button>

          </div>


          {/* Account */}

          <div className="settings-section account-section">

            <h2>
              Account
            </h2>

          </div>


          <button
            className="settings-profile-btn"
            onClick={() => navigate("/profile")}
          >
            👤 Manage Profile
          </button>


          <button
            className="settings-logout-btn"
            onClick={handleLogout}
          >
            ⇥ Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;