import { useEffect, useRef, useState } from "react";

export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState("up");
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (Math.abs(diff) < threshold) return;
      setDirection(diff > 0 ? "down" : "up");
      lastY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return direction;
}
