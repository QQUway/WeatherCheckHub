import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./css/style.css";
import "boxicons";
import Home from "./components/Home";
import Login from "./components/Login";

export default function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
}
