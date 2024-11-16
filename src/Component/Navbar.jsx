import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });
  const [isHovering, setIsHovering] = useState(false); // Track hover state
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Apply the saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    let timer;
    if (avatarMenuOpen && !isHovering) {
      timer = setTimeout(() => {
        setAvatarMenuOpen(false);
      }, 800);
    }
    return () => clearTimeout(timer);
  }, [avatarMenuOpen, isHovering]);

  const logout = async () => {
    try {
      const response = await fetch(
        "https://car-spyne-backend.onrender.com/api/v1/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      // localStorage.removeItem("user");
      // window.location.href = "/allpg";

      if (response.ok) {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/allpg");
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  const handleAvatarClick = () => {
    setAvatarMenuOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setAvatarMenuOpen(true); // Ensure menu is open on hover
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/allpg">
              <img
                src={isDarkMode ? "/adark.png" : "/a.svg.jpg"}
                alt="PGDekho Logo"
                className="h-12"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-black dark:text-gray-200 hover:text-gray-300 dark:hover:text-gray-400"
            >
              Home
            </Link>

            {user ? (
              <>
                {role === "admin" && (
                  <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={user.user.avatar || "/default-avatar.png"}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                      onClick={handleAvatarClick}
                    />
                    {avatarMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-50">
                        <Link to="/profile">
                          <button className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                            View Profile
                          </button>
                        </Link>
                        <Link to="/AddHome">
                          <button className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                            Add Car
                          </button>
                        </Link>
                        <button
                          onClick={logout}
                          className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {role !== "admin" && (
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:bg-gray-800"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Home
          </Link>
          {user ? (
            <>
              {role === "admin" && (
                <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={user.user.avatar || "/default-avatar.png"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    onClick={handleAvatarClick}
                  />
                  {avatarMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-50">
                      <Link to="/profile">
                        <button className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                          View Profile
                        </button>
                      </Link>
                      <Link to="/AddHome">
                        <button className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                          Add Car
                        </button>
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
              {role !== "admin" && (
                <button
                  onClick={logout}
                  className="block w-full bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="block w-full text-left text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="block w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="block w-full p-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
