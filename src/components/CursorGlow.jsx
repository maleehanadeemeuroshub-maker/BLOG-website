import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, [role="button"], .btn, .card, .blog-card';

// A minimal, low-opacity dot that trails the cursor with a soft spring lag.
// Purely decorative (pointer-events: none) and skipped entirely on touch
// devices and when the user prefers reduced motion.
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const springConfig = { stiffness: 280, damping: 32, mass: 0.4 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const scale = useSpring(hovering ? 0.6 : 1, { stiffness: 300, damping: 24 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(canHover && !reduceMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    const handleOver = (e) => {
      setHovering(Boolean(e.target.closest(INTERACTIVE_SELECTOR)));
    };
    const handleLeaveWindow = () => {
      rawX.set(-100);
      rawY.set(-100);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeaveWindow);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`cursor-glow ${hovering ? "cursor-glow-active" : ""}`}
      style={{ x, y, scale }}
      aria-hidden="true"
    />
  );
}
