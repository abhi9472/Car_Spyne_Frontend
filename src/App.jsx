import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar";
import "./index.css";
import "./tailwind.css";
import SearchBar from "./Pages/SearchBar";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        backgroundImage: "url(/path-to-your-background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar
        isLoggedIn={isLoggedIn}
        onToggleDarkMode={toggleDarkMode}
        setIsLoggedIn={setIsLoggedIn}
        darkMode={darkMode}
      />

      {/* Embed SearchBar here */}
      <div className="pt-16">
        <SearchBar />
      </div>

      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
