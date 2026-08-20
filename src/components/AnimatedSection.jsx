// Wraps a page section with a centered container, so pages don't repeat the
// same section+container markup. The constellation background now lives once,
// globally, in App.jsx rather than per section.
export default function AnimatedSection({
  as: Tag = "section",
  className = "",
  containerClassName = "container",
  children,
}) {
  return (
    <Tag className={className}>
      <div className={containerClassName}>{children}</div>
    </Tag>
  );
}
