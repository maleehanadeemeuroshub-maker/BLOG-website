import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FiCode,
  FiCommand,
  FiCpu,
  FiHexagon,
  FiLayers,
  FiPenTool,
} from "react-icons/fi";

const ringOneIcons = [FiCode, FiCpu, FiPenTool];
const ringTwoIcons = [FiHexagon, FiCommand, FiLayers, FiCode];

function OrbitRing({ radius, duration, direction, icons, iconSize = 40 }) {
  const ringClass = direction === "cw" ? "orbit-cw" : "orbit-ccw";
  const iconClass = direction === "cw" ? "orbit-icon-ccw" : "orbit-icon-cw";

  return (
    <div
      className={`orbit-ring ${ringClass}`}
      style={{ "--radius": `${radius}px`, "--duration": `${duration}s` }}
    >
      {icons.map((Icon, i) => (
        <span
          key={i}
          className="orbit-node"
          style={{ "--angle": `${(360 / icons.length) * i}deg`, "--radius": `${radius}px` }}
        >
          <span
            className={`orbit-icon ${iconClass}`}
            style={{ "--duration": `${duration}s`, width: iconSize, height: iconSize }}
          >
            <Icon size={iconSize * 0.42} />
          </span>
        </span>
      ))}
    </div>
  );
}

export default function HeroVisual() {
  const containerRef = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 55, damping: 16, mass: 0.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  const blobX = useTransform(springX, (v) => v * 0.35);
  const blobY = useTransform(springY, (v) => v * 0.35);
  const orbitX = useTransform(springX, (v) => v * 0.7);
  const orbitY = useTransform(springY, (v) => v * 0.7);
  const deviceX = useTransform(springX, (v) => v * 1.2);
  const deviceY = useTransform(springY, (v) => v * 1.2);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px * 36);
    rawY.set(py * 36);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className="hero-visual"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ y: scrollShift, opacity: scrollOpacity }}
      initial={{ opacity: 0, scale: 0.85, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span className="floating-orb hero-visual-blob-1" style={{ x: blobX, y: blobY }} />
      <motion.span className="floating-orb hero-visual-blob-2" style={{ x: blobX, y: blobY }} />

      <div className="hero-visual-particles">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>

      <motion.div className="hero-visual-orbits" style={{ x: orbitX, y: orbitY }}>
        <OrbitRing radius={95} duration={20} direction="cw" icons={ringOneIcons} />
        <OrbitRing radius={155} duration={30} direction="ccw" icons={ringTwoIcons} iconSize={36} />
      </motion.div>

      <motion.div
        className="device-mockup glass"
        style={{ x: deviceX, y: deviceY }}
        initial={{ opacity: 0, y: 30, rotate: -14 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="device-mockup-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="device-mockup-thumb" />
        <div className="device-mockup-line" style={{ width: "85%", height: 10 }} />
        <div className="device-mockup-line" style={{ width: "95%" }} />
        <div className="device-mockup-line" style={{ width: "60%" }} />
        <div className="device-mockup-footer">
          <span className="device-mockup-avatar" />
          <div className="device-mockup-line" style={{ width: 70, height: 7 }} />
        </div>
      </motion.div>

      <motion.div
        className="hero-visual-chip glass"
        initial={{ opacity: 0, y: -14, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="hero-visual-chip-dot" />
        New article published
      </motion.div>
    </motion.div>
  );
}
