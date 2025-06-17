import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md transition-colors duration-300 z-50"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 9 9 0 0 0 21 12.79z"></path>
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2m0 16v2m9-9h2M1 12h2m13.5-6.5l1.42 1.42M6.08 6.08L4.66 4.66m13.5 13.5l1.42-1.42M6.08 17.92L4.66 19.34"/>
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle; 