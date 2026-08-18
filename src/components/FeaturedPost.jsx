import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { getCategory } from "../data/categories";
import { authors } from "../data/authors";
import TiltCard from "./TiltCard";

export default function FeaturedPost({ post }) {
  const category = getCategory(post.category);
  const author = authors[post.author];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard max={3.5}>
        <Link to={`/blog/${post.id}`} className="featured-post">
          <div className="featured-post-image">
            <img src={post.image} alt={post.title} />
          </div>
          <div className="featured-post-body">
            {category && (
              <span className="badge" style={{ width: "fit-content" }}>
                {category.icon} {category.name}
              </span>
            )}
            <h2 className="featured-post-title">{post.title}</h2>
            <p className="featured-post-excerpt">{post.excerpt}</p>
            <div className="blog-card-footer">
              {author && <img className="avatar" src={author.avatar} alt={author.name} />}
              <span style={{ fontSize: 13.5, color: "var(--text-muted)" }}>
                {post.author} &middot; {post.date} &middot;
              </span>
              <span style={{ fontSize: 13.5, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                <FiClock size={12} /> {post.readingTime} min
              </span>
            </div>
            <span className="btn btn-outline btn-sm" style={{ width: "fit-content", marginTop: 8 }}>
              Read Article <FiArrowRight size={14} />
            </span>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
