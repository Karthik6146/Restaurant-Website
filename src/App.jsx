import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, NavLink, useLocation } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import ThemeProvider from "./context/ThemeContext";
import ThemeToggle from "./components/common/ThemeToggle";
import "./index.css";

const links = [
  ["/menu", "The menu"],
  ["/about", "Our story"],
  ["/specials", "What's on"],
  ["/group-dining", "Private dining"],
];
const titles = {
  "/": "Seasonal food. Lasting memories.",
  "/menu": "The menu",
  "/about": "Our story",
  "/specials": "What's on",
  "/reservation": "Reserve a table",
  "/giftcards": "Gift cards",
  "/careers": "Careers",
  "/group-dining": "Private dining",
};

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);
  const menuButton = useRef(null);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    setMenuOpen(false);
    document.title = `${titles[location.pathname] || "Page not found"} | Arevei`;
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    } else if (previousPath.current !== location.pathname) {
      window.scrollTo(0, 0);
      mainRef.current?.focus({ preventScroll: true });
    }
    previousPath.current = location.pathname;
  }, [location.pathname, location.hash]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="container header-inner">
          <Link to="/" className="wordmark" aria-label="Arevei home">
            arevei<span aria-hidden="true">.</span>
            <small>RESTAURANT & BAR</small>
          </Link>
          <nav
            id="primary-navigation"
            className={`primary-nav ${menuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            {links.map(([to, label]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
            <Link className="button nav-reserve" to="/reservation">
              Reserve a table <span aria-hidden="true">↗</span>
            </Link>
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <button
              ref={menuButton}
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        <AppRouter />
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="wordmark">
              arevei<span>.</span>
            </Link>
            <p>
              Good food. Good company.
              <br />A little something to remember.
            </p>
          </div>
          <div>
            <h2>At the table</h2>
            <Link to="/menu">Explore the menu</Link>
            <Link to="/reservation">Reservations</Link>
            <Link to="/group-dining">Private dining</Link>
          </div>
          <div>
            <h2>Beyond the table</h2>
            <Link to="/about">Our story</Link>
            <Link to="/giftcards">Gift cards</Link>
            <Link to="/careers">Join the team</Link>
          </div>
          <div>
            <h2>Plan your visit</h2>
            <p>
              Mon–Thu · 11am–10pm
              <br />
              Fri–Sat · 11am–11pm
              <br />
              Sunday · 10am–9pm
            </p>
            <Link to="/#visit">Visitor information ↗</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Arevei Restaurant</span>
          <span>
            Restaurant concept · Sample menu and hours. Location and contact
            details awaiting verification.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
