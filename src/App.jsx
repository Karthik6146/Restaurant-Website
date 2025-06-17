import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import ThemeProvider from "./context/ThemeContext";
import CustomCursor from "./components/common/CustomCursor";
import ThemeToggle from "./components/common/ThemeToggle";
import { AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import './index.css';

const ChefHatLogo = () => (
  <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="32" rx="28" ry="16" fill="#B23A48" stroke="#B23A48" strokeWidth="3" />
    <ellipse cx="32" cy="24" rx="16" ry="10" fill="#B23A48" stroke="#B23A48" strokeWidth="3" />
    <ellipse cx="20" cy="28" rx="6" ry="4" fill="#B23A48" stroke="#B23A48" strokeWidth="2" />
    <ellipse cx="44" cy="28" rx="6" ry="4" fill="#B23A48" stroke="#B23A48" strokeWidth="2" />
    <rect x="24" y="38" width="16" height="8" rx="3" fill="#B23A48" />
  </svg>
);

const SocialIcons = () => (
  <div className="flex gap-4 justify-center mt-2">
    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a>
    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 8h-2a2 2 0 0 0-2 2v2h4"/><path d="M12 16v-4"/></svg></a>
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M8 19c11 0 11-7 11-7v-1a7.72 7.72 0 0 0 2-2c-.7.3-1.5.5-2.3.6A4.1 4.1 0 0 0 21 6.1a8.2 8.2 0 0 1-2.6 1A4.1 4.1 0 0 0 12 15.5c-3.3 0-6-2.7-6-6 0-.1 0-.2 0-.3A8.2 8.2 0 0 0 3 7.1a4.1 4.1 0 0 0 1.8 5.5A4.1 4.1 0 0 1 2 12.6v.1c0 2.3 1.6 4.2 3.8 4.6"/></svg></a>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CustomCursor />
        {/* Header with logo and navigation */}
        <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-matte-black/80 backdrop-blur-md shadow-lg z-50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <NavLink to="/" className="flex items-center gap-3 group">
              <ChefHatLogo />
              <span className="text-3xl font-serif font-bold text-primary tracking-wide group-hover:text-accent transition-colors duration-300">Arevei</span>
            </NavLink>

            <nav className="hidden md:flex items-center gap-8">
              <NavLink to="/menu" className={({ isActive }) => "text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors duration-300" + (isActive ? " text-primary border-b-2 border-primary" : "")}>
                Menu
              </NavLink>
              <NavLink to="/reservation" className={({ isActive }) => "text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors duration-300" + (isActive ? " text-primary border-b-2 border-primary" : "")}>
                Reservation
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => "text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors duration-300" + (isActive ? " text-primary border-b-2 border-primary" : "")}>
                About
              </NavLink>
              <NavLink to="/specials" className={({ isActive }) => "text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors duration-300" + (isActive ? " text-primary border-b-2 border-primary" : "")}>
                Specials
              </NavLink>
              <ThemeToggle />
              <button
                onClick={() => window.location.href = "/reservation"}
                className="ml-4 px-6 py-2 bg-primary text-white rounded-full shadow-md font-semibold hover:bg-accent transition-all duration-300"
              >
                Book Now
              </button>
            </nav>

            {/* Mobile Menu Button (Hamburger) - To be implemented for responsiveness */}
            <div className="md:hidden">
              {/* <button className="text-gray-700 dark:text-gray-200 focus:outline-none">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button> */}
              <ThemeToggle /> {/* ThemeToggle for mobile */}
            </div>
          </div>
        </header>
        <main className="flex-1 pt-24"> {/* Add padding-top to main content equal to header height */}
          <AnimatePresence mode="wait">
            <AppRouter />
          </AnimatePresence>
        </main>
        {/* Footer with logo and social icons */}
        <footer className="mt-20 py-8 bg-white/80 dark:bg-matte-black/80 border-t border-secondary text-center text-gray-600 dark:text-gray-300 text-sm">
          <div className="flex flex-col items-center gap-2">
            <ChefHatLogo />
            <span className="font-serif font-bold text-primary text-lg">Arevei Restaurant</span>
            <SocialIcons />
          </div>
          <div className="mt-2">&copy; {new Date().getFullYear()} Arevei Restaurant. All rights reserved.</div>
        </footer>
      </Router>
    </ThemeProvider>
  );
}

export default App; 