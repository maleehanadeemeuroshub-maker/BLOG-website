// Animated glowing border that traces the edge of its (positioned) parent.
// Reuses the same rotating conic-gradient/mask technique as the Newsletter
// glow border, generalized into one reusable piece. By default the beam is
// idle until the host card is hovered (cheap for large grids); pass
// `alwaysOn` for prominent single elements that should always be gently
// animating, speeding up and brightening further on hover.
export default function BorderBeam({
  duration = 7,
  hoverDuration = 2.4,
  color,
  width = 1.5,
  opacity = 0.5,
  hoverOpacity = 0.95,
  alwaysOn = false,
  className = "",
}) {
  return (
    <span
      aria-hidden="true"
      className={`border-beam ${alwaysOn ? "border-beam-always-on" : ""} ${className}`.trim()}
      style={{
        "--beam-duration": `${duration}s`,
        "--beam-duration-hover": `${hoverDuration}s`,
        "--beam-width": `${width}px`,
        "--beam-opacity": opacity,
        "--beam-opacity-hover": hoverOpacity,
        ...(color ? { "--beam-color": color } : {}),
      }}
    />
  );
}
