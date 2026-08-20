import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiClock } from "react-icons/fi";
import { posts } from "../data/posts";
import { getCategory } from "../data/categories";
import { authors } from "../data/authors";

export default function HeroVisual() {
  const containerRef = useRef(null);
  const post = posts[0];
  const category = post ? getCategory(post.category) : null;
  const author = post ? authors[post.author] : null;
  const stackPosts = posts.slice(1, 3);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 20, mass: 0.6 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px * 12);
    rawY.set(py * 12);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  if (!post) return null;

  return (
    <motion.div
      ref={containerRef}
      className="hero-visual"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ y: scrollShift, opacity: scrollOpacity }}
      initial={{ opacity: 0, scale: 0.94, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="floating-orb hero-visual-blob-1" />

      <motion.div className="hero-stack" style={{ x, y }}>
        {stackPosts.map((p, i) => (
          <span key={p.id} className={`hero-stack-card hero-stack-card-${i + 1}`} />
        ))}

        <div className="hero-article-card glass">
          <div
            className="hero-article-thumb"
            style={{ backgroundImage: `url(${post.image})` }}
          >
            {category && (
              <span className="hero-article-badge">
                {category.icon} {category.name}
              </span>
            )}
          </div>
          <div className="hero-article-body">
            <p className="hero-article-title">{post.title}</p>
            <div className="hero-article-meta">
              {author && (
                <img className="hero-article-avatar" src={author.avatar} alt="" />
              )}
              <span className="hero-article-author">{post.author}</span>
              <span className="hero-article-dot" />
              <span className="hero-article-time">
                <FiClock size={11} /> {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
