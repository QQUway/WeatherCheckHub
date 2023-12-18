import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [defaultCity, setDefaultCity] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isExistingUser = existingUsers.some(
      (user) => user.username === username
    );

    if (!isExistingUser) {
      const newUser = {
        id: Date.now(),
        username,
        password,
        defaultCity,
      };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      navigate("/"); // Redirect to the login page after successful registration
    } else {
      setError("Username already exists. Please choose a different username.");
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleRegister} id="registerForm">
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Default City"
            value={defaultCity}
            onChange={(e) => setDefaultCity(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
