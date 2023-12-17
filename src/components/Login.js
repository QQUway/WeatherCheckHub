import React, { useState } from "react";
import users from "./Users";
import { useNavigate } from "react-router-dom"; // Updated import

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Updated to useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    // Mocked authentication logic
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      redirectToHome(user); // Redirect to home with user information
    } else {
      // Handle login failure (e.g., show error message)
      console.log("Invalid credentials");
    }
  };

  const redirectToHome = (user) => {
    if (user && user.defaultCity) {
      console.log(`User's default city: ${user.defaultCity}`);
      navigate("/home", { state: { user } });
    } else {
      console.error("User information incomplete or invalid");
      // Handle the scenario where user information is incomplete or invalid
      // For example, display an error message or redirect to an error page
    }
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleLogin} id="loginForm">
          {/* Username and password input fields */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
