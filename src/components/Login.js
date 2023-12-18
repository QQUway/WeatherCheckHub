import React, { useState } from "react";
import users from "./Users";
import { useNavigate, Link } from "react-router-dom";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      redirectToHome(user);
    } else {
      setError("Invalid username or password");
    }
  };

  const redirectToHome = (user) => {
    if (user && user.defaultCity) {
      console.log(`User's default city: ${user.defaultCity}`);
      navigate("/home", { state: { user } });
    } else {
      setError("User information incomplete or invalid");
    }
  };

  return (
          <div className="card">
          <form onSubmit={handleLogin} id="loginForm">
            <h2>Login</h2>
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
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <div>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link> 
          </div>
      </div>

  );
};

export default Login;
