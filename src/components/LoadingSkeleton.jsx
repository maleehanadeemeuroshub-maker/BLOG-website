export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="blog-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton skeleton-image" />
          <div className="skeleton-body">
            <div className="skeleton skeleton-line" style={{ width: "40%" }} />
            <div className="skeleton skeleton-line" style={{ width: "90%", height: 18 }} />
            <div className="skeleton skeleton-line" style={{ width: "70%" }} />
            <div className="skeleton skeleton-line" style={{ width: "50%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
