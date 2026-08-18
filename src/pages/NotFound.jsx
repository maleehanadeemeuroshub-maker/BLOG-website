import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="not-found">
        <span className="floating-orb hero-orb-1" style={{ top: 0, right: "10%" }} />
        <motion.div
          className="not-found-number gradient-text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          404
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          This page wandered off the map.
        </motion.h2>
        <motion.p
          style={{ color: "var(--text-muted)", maxWidth: 420 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          The article or page you're looking for doesn't exist or may have
          been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <Link className="btn btn-primary" to="/">
            <FiArrowLeft size={16} /> Back to Home
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
}
