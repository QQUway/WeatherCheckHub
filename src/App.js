import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./css/style.css";
import "./css/Notes.css";

import "boxicons";
import Home from "./components/Home";
import Login from "./components/Login";
import Notes from "./components/Notes";
import Register from "./components/Register"
import About from "./components/AboutUs"

export default function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="notes" element={<Notes />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
