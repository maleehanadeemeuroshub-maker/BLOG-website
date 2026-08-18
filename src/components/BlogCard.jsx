import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { getCategory } from "../data/categories";
import { authors } from "../data/authors";
import BookmarkButton from "./BookmarkButton";
import TiltCard from "./TiltCard";
import BorderBeam from "./BorderBeam";

export default function BlogCard({ post, index = 0 }) {
  const category = getCategory(post.category);
  const author = authors[post.author];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard max={7} glare style={{ height: "100%" }}>
        <Link to={`/blog/${post.id}`} className="blog-card">
          <BorderBeam />
          <div className="blog-card-image">
            <img src={post.image} alt={post.title} loading="lazy" />
            {category && (
              <span className="badge">
                {category.icon} {category.name}
              </span>
            )}
            <BookmarkButton postId={post.id} className="blog-card-bookmark" />
          </div>
          <div className="blog-card-body">
            <div className="blog-card-meta">
              <span>{post.date}</span>
              <span>&middot;</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <FiClock size={12} /> {post.readingTime} min read
              </span>
            </div>
            <h3 className="blog-card-title">{post.title}</h3>
            <p className="blog-card-excerpt">{post.excerpt}</p>
            <div className="blog-card-footer">
              {author && <img className="avatar" src={author.avatar} alt={author.name} />}
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{post.author}</span>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
