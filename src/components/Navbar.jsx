import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { FiBookmark, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useBlog } from "../context/BlogContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const scrolled = useScrollPosition(12);
  const direction = useScrollDirection(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const { bookmarks } = useBlog();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);
  const hidden = scrolled && direction === "down" && !menuOpen;

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""} ${hidden ? "nav-hidden" : ""}`}>
        <div className="container">
          <NavLink to="/" className="brand">
            <span className="brand-mark">✦</span>
            DevNotes
          </NavLink>

          <nav className="nav-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="icon-btn bookmark-nav-btn"
              onClick={() => navigate("/blog?bookmarks=true")}
              aria-label="View bookmarks"
              title="Saved articles"
            >
              <FiBookmark size={16} fill={bookmarks.length ? "currentColor" : "none"} />
            </button>
            <ThemeToggle />
            <button
              className="nav-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-header">
              <span className="brand">
                <span className="brand-mark">✦</span>
                DevNotes
              </span>
              <button className="icon-btn" onClick={closeMenu} aria-label="Close menu">
                <FiX size={20} />
              </button>
            </div>

            <nav className="mobile-menu-links">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mobile-menu-footer">
              <ThemeToggle />
              <button
                className="btn btn-outline"
                onClick={() => {
                  closeMenu();
                  navigate("/blog?bookmarks=true");
                }}
              >
                <FiBookmark size={16} /> Saved ({bookmarks.length})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
