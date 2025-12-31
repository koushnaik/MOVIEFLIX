import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites"; // ⭐ ADD
import Navbar from "./components/Navbar";

import "./styles.css";

function App() {
  const [theme, setTheme] = useState("dark");

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === "light" ? "light" : "";
  }, [theme]);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} /> {/* ⭐ ADD */}
      </Routes>
    </>
  );
}

export default App;
