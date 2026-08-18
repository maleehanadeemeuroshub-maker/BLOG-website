import ConstellationGrid from "./ConstellationGrid";

// Wraps a page section with a full-bleed constellation background behind a
// centered container, so pages don't repeat the same background+container
// markup. Pass `constellation={false}` to render a plain section.
export default function AnimatedSection({
  as: Tag = "section",
  className = "",
  containerClassName = "container",
  constellation = true,
  density = "low",
  intensity = 0.35,
  radar = false,
  glow = true,
  forceDark = null,
  children,
}) {
  return (
    <Tag className={`${className} ${constellation ? "has-constellation" : ""}`.trim()}>
      {constellation && (
        <ConstellationGrid density={density} intensity={intensity} radar={radar} glow={glow} forceDark={forceDark} />
      )}
      <div className={containerClassName} style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </Tag>
  );
}
