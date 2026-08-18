import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({
  children,
  className = "",
  max = 10,
  scale = 1,
  glare = false,
  style = {},
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), springConfig);
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.25), transparent 60%)`
  );
  const hoverScale = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => hoverScale.set(scale);

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    hoverScale.set(1);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1200, ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: hoverScale,
          transformStyle: "preserve-3d",
          position: "relative",
          height: "100%",
        }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="tilt-glare"
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  );
}
