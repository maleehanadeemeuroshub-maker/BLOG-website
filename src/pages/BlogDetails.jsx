import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiClock } from "react-icons/fi";
import { getPost, getRelatedPosts } from "../data/posts";
import { getCategory } from "../data/categories";
import { authors } from "../data/authors";
import BookmarkButton from "../components/BookmarkButton";
import ShareButtons from "../components/ShareButtons";
import BlogCard from "../components/BlogCard";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";
import NotFound from "./NotFound";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = getPost(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!post) return <NotFound />;

  const category = getCategory(post.category);
  const author = authors[post.author];
  const related = getRelatedPosts(post, 3);

  return (
    <PageTransition>
      <article>
        <div className="container">
          <div className="article-top-visual has-constellation">
          <div className="article-top-content">
          <motion.button
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
            style={{ marginTop: 32 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FiArrowLeft size={16} /> Back
          </motion.button>

          <div className="article-header">
            {category && (
              <motion.span
                className="badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {category.icon} {category.name}
              </motion.span>
            )}
            <motion.h1
              className="article-title"
              style={{ marginTop: 20 }}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              className="article-meta-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {author && (
                <div className="article-author">
                  <img src={author.avatar} alt={author.name} />
                  <div style={{ textAlign: "left" }}>
                    <div className="article-author-name">{author.name}</div>
                    <div className="article-author-role">{author.role}</div>
                  </div>
                </div>
              )}
              <span>&middot;</span>
              <span>{post.date}</span>
              <span>&middot;</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <FiClock size={14} /> {post.readingTime} min read
              </span>
            </motion.div>
          </div>

          <motion.div
            className="article-hero-image"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={post.image} alt={post.title} />
          </motion.div>
          </div>
          </div>

          <div className="article-body-wrap">
            <div className="article-toolbar">
              <ShareButtons title={post.title} />
              <BookmarkButton postId={post.id} />
            </div>

            <div className="article-content">
              {post.content.split("\n\n").map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <div className="article-tags">
              {post.tags.map((tag) => (
                <Link key={tag} className="tag" to={`/blog?search=${encodeURIComponent(tag)}`}>
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <AnimatedSection className="related-section">
            <div className="section-head">
              <div>
                <span className="section-eyebrow">Keep reading</span>
                <h2>Related Articles</h2>
              </div>
            </div>
            <div className="blog-grid">
              {related.map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </AnimatedSection>
        )}
      </article>
    </PageTransition>
  );
}
