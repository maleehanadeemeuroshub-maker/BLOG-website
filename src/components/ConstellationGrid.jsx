import { useEffect, useRef } from "react";
import { useBlog } from "../context/BlogContext";

const DENSITY_SPACING = {
  high: { base: 55, mobile: 74 },
  medium: { base: 78, mobile: 98 },
  low: { base: 102, mobile: 124 },
};

// Ambient animated node grid used as a background layer behind a section.
// Scoped to its parent container (not the viewport) via ResizeObserver,
// transparent so the page background shows through, pointer-events free so
// it never intercepts clicks, and only animates while scrolled into view
// (IntersectionObserver) so having many instances on one page stays cheap.
export default function ConstellationGrid({
  density = "medium",
  intensity = 0.5,
  forceDark = null,
  className = "",
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useBlog();
  const isDarkMode = forceDark !== null ? forceDark : theme === "dark";

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spacingConfig = DENSITY_SPACING[density] || DENSITY_SPACING.medium;
    const clampedIntensity = Math.min(Math.max(intensity, 0.08), 1);

    let animationFrameId = null;
    let isVisible = false;
    let width = 0;
    let height = 0;
    let nodes = [];
    let spacing = spacingConfig.base;

    const initNodes = () => {
      nodes = [];
      spacing = width < 640 ? spacingConfig.mobile : spacingConfig.base;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          nodes.push({
            x: i * spacing,
            y: j * spacing,
            radius: Math.random() * 1.1 + 1,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initNodes();
    };

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(wrapper);

    let lastTime = performance.now();

    const drawFrame = (dt) => {
      const nodeColor = isDarkMode ? "246, 245, 249" : "22, 21, 29";

      ctx.clearRect(0, 0, width, height);

      // Threshold covers orthogonal neighbors plus diagonals (spacing * sqrt(2))
      // so the resting grid actually forms a connected mesh, not isolated dots.
      const MAX_CONN_DIST = spacing * 1.45;
      const MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const ndx = n.x - n2.x;
          const ndy = n.y - n2.y;
          const distSq = ndx * ndx + ndy * ndy;

          if (distSq < MAX_CONN_DIST_SQ) {
            const nDist = Math.sqrt(distSq);
            const alpha =
              (1 - nDist / MAX_CONN_DIST) * (isDarkMode ? 0.2 : 0.12) * clampedIntensity;
            ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reduceMotion) n.pulse += dt * 3;
        const alpha = (0.22 + Math.sin(n.pulse) * 0.08) * clampedIntensity;
        const currentRadius = n.radius + (reduceMotion ? 0 : Math.sin(n.pulse) * 0.25);

        ctx.fillStyle = `rgba(${nodeColor}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const render = (now) => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      drawFrame(dt);

      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (animationFrameId || reduceMotion) return;
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "200px 0px" }
    );
    intersectionObserver.observe(wrapper);

    if (reduceMotion) {
      drawFrame(0);
    }

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [isDarkMode, density, intensity]);

  return (
    <div ref={wrapperRef} className={`constellation-bg ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="constellation-bg-canvas" />
    </div>
  );
}
