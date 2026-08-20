import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiMail } from "react-icons/fi";
import BorderBeam from "./BorderBeam";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="newsletter">
      <BorderBeam alwaysOn duration={8} opacity={0.55} color="rgba(255,255,255,0.9)" />
      <span className="newsletter-shape newsletter-shape-1" />
      <span className="newsletter-shape newsletter-shape-2" />
      <span className="newsletter-shape newsletter-shape-3" />
      <div className="newsletter-content">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="newsletter-success"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <FiCheckCircle size={22} /> You&apos;re subscribed! Welcome aboard.
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h2>
              <FiMail size={26} style={{ verticalAlign: "-4px", marginRight: 8 }} />
              Join the newsletter
            </h2>
            <p>
              Get the best articles on React, JavaScript, and modern web
              development delivered straight to your inbox. No spam, ever.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
              />
              <button className="btn btn-primary" type="submit">
                Subscribe
              </button>
            </form>
            {error && (
              <p style={{ color: "#fecaca", fontSize: 13, marginTop: 10 }}>{error}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
