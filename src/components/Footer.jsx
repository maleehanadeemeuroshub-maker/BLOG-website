import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { categories } from "../data/categories";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <span className="brand-mark">✦</span>
              DevNotes
            </Link>
            <p>
              Stories, ideas and insights for the modern web — written by
              engineers and designers who build for a living.
            </p>
            <div className="footer-social">
              <a className="icon-btn" href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <FiTwitter size={16} />
              </a>
              <a className="icon-btn" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FiGithub size={16} />
              </a>
              <a className="icon-btn" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FiLinkedin size={16} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/about">About</Link>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            {categories.slice(0, 4).map((c) => (
              <Link key={c.id} to={`/blog?category=${c.id}`}>
                {c.name}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} DevNotes. All rights reserved.</span>
          <span>Built with React, Vite &amp; Framer Motion — Week 6 Project</span>
        </div>
      </div>
    </footer>
  );
}
