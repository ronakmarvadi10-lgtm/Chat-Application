import "./Profile.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("chatUser"))
  );

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user?.name || "");

  const handleSave = () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    const updatedUser = {
      ...user,
      name: name.trim(),
    };

    // Update logged-in user
    localStorage.setItem(
      "chatUser",
      JSON.stringify(updatedUser)
    );

    // Update registered users
    const users =
      JSON.parse(localStorage.getItem("chatUsers")) || [];

    const updatedUsers = users.map((item) =>
      item.id === user.id
        ? {
            ...item,
            name: name.trim(),
          }
        : item
    );

    localStorage.setItem(
      "chatUsers",
      JSON.stringify(updatedUsers)
    );

    setUser(updatedUser);
    setEditing(false);

    alert("Profile updated successfully");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* Header */}

        <div className="profile-header">

          <button
            className="profile-back"
            onClick={() => navigate("/chat")}
          >
            ← Back to Chat
          </button>

          <h1>
            My Profile
          </h1>

        </div>


        {/* Profile Card */}

        <div className="profile-card">

          <div className="profile-avatar-large">
            {user.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="profile-status">
            <span></span>
            Online
          </div>


          {/* Name */}

          <div className="profile-field">

            <label>
              Full Name
            </label>

            {editing ? (

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            ) : (

              <div className="profile-value">
                {user.name}
              </div>

            )}

          </div>


          {/* Email */}

          <div className="profile-field">

            <label>
              Email Address
            </label>

            <div className="profile-value">
              {user.email}
            </div>

          </div>


          {/* Account ID */}

          <div className="profile-field">

            <label>
              Account ID
            </label>

            <div className="profile-value">
              #{user.id}
            </div>

          </div>


          {/* Buttons */}

          <div className="profile-actions">

            {editing ? (
              <>
                <button
                  className="profile-save-btn"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

                <button
                  className="profile-cancel-btn"
                  onClick={() => {
                    setName(user.name);
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="profile-edit-btn"
                onClick={() =>
                  setEditing(true)
                }
              >
                Edit Profile
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;