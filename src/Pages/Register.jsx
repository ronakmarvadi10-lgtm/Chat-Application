import "./Register.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      alert("Please fill all details");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
    };

    // Existing users
    const users =
      JSON.parse(localStorage.getItem("chatUsers")) || [];

    // Check duplicate email
    const alreadyExists = users.some(
      (user) => user.email === form.email
    );

    if (alreadyExists) {
      alert("Account with this email already exists");
      return;
    }

    // Save new user
    users.push(newUser);

    localStorage.setItem(
      "chatUsers",
      JSON.stringify(users)
    );

    alert("Account created successfully");

    navigate("/login");
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* LEFT */}

        <div className="register-left">

          <div className="register-logo">
            ChatApp
          </div>

          <h1>
            Join ChatApp
          </h1>

          <p>
            Create your account and start connecting
            with your friends.
          </p>

          <div className="register-features">

            <div>
              ✓ Simple messaging
            </div>

            <div>
              ✓ Personal profile
            </div>

            <div>
              ✓ Modern chat interface
            </div>

          </div>

        </div>


        {/* RIGHT */}

        <div className="register-card">

          <h2>
            Create Account
          </h2>

          <p className="register-subtitle">
            Enter your information to get started
          </p>


          <form onSubmit={handleRegister}>

            {/* Name */}

            <div className="register-input">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />

            </div>


            {/* Email */}

            <div className="register-input">

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

            <div className="register-input">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={form.password}
                onChange={handleChange}
              />

            </div>


            {/* Confirm Password */}

            <div className="register-input">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
              />

            </div>


            <button
              type="submit"
              className="register-btn"
            >
              Create Account
            </button>

          </form>


          <div className="login-link">

            <span>
              Already have an account?
            </span>

            <button
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;