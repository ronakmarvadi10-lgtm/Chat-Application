import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Please enter email and password");
      return;
    }

    // Get registered users
    const users =
      JSON.parse(localStorage.getItem("chatUsers")) || [];

    // Find user
    const user = users.find(
      (user) =>
        user.email.toLowerCase() ===
          form.email.trim().toLowerCase() &&
        user.password === form.password
    );

    // User not found
    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // Save logged-in registered user
    localStorage.setItem(
      "chatUser",
      JSON.stringify(user)
    );

    alert("Login successful");

    navigate("/chat");
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Left Section */}

        <div className="login-left">

          <div className="brand-logo">
            ChatApp
          </div>

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to continue chatting with your friends
            and manage your conversations.
          </p>

        </div>


        {/* Right Section */}

        <div className="login-card">

          <h2>
            Login
          </h2>

          <p className="login-subtitle">
            Enter your details to continue
          </p>


          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />

            </div>


            {/* Password */}

            <div className="input-group">

              <label>
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* Remember */}

            <div className="login-options">

              <label className="remember">

                <input
                  type="checkbox"
                />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="button"
                className="forgot-btn"
                onClick={() =>
                  alert(
                    "Password reset feature will be added later."
                  )
                }
              >
                Forgot Password?
              </button>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>

          </form>


          {/* Register */}

          <div className="register-link">

            <span>
              Don't have an account?
            </span>

            <button
              onClick={() =>
                navigate("/register")
              }
            >
              Create Account
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;