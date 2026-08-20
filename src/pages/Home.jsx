import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { useBlog } from "../context/BlogContext";
import { categories } from "../data/categories";
import FeaturedPost from "../components/FeaturedPost";
import BlogCard from "../components/BlogCard";
import CategoryCard from "../components/CategoryCard";
import Newsletter from "../components/Newsletter";
import PageTransition from "../components/PageTransition";
import HeroVisual from "../components/HeroVisual";
import MagneticWrap from "../components/MagneticWrap";
import AnimatedSection from "../components/AnimatedSection";

const headline = "Stories, Ideas & Insights for the Modern Web.";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.028 } },
};

const word = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  const { posts } = useBlog();

  const featured = posts[0];
  const latest = posts.slice(1, 7);
  const popular = [...posts].sort((a, b) => b.readingTime - a.readingTime).slice(0, 4);

  return (
    <PageTransition>
      <section className="hero">
        <span className="floating-orb hero-orb-1" />
        <span className="floating-orb hero-orb-2" />
        <div className="container hero-inner">
          <div className="hero-content">
          <motion.span
            className="hero-eyebrow glass"
            style={{ color: "var(--accent)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiZap size={14} /> Fresh perspectives, every week
          </motion.span>

          <motion.h1
            className="hero-title"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {headline.split(" ").map((w, i) => (
              <motion.span
                key={i}
                variants={word}
                style={{ display: "inline-block", marginRight: "0.28em" }}
                className={w === "Modern" || w === "Web." ? "gradient-text" : ""}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Deep dives into React, JavaScript, AI, design and the craft of
            building great software — written by engineers who ship for a
            living.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <MagneticWrap>
              <Link className="btn btn-primary" to="/blog">
                Explore Articles <FiArrowRight size={16} />
              </Link>
            </MagneticWrap>
            <MagneticWrap strength={10}>
              <Link className="btn btn-outline" to="/categories">
                Browse Categories
              </Link>
            </MagneticWrap>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div>
              <div className="hero-stat-value">{posts.length}+</div>
              <div className="hero-stat-label">Published Articles</div>
            </div>
            <div>
              <div className="hero-stat-value">{categories.length}</div>
              <div className="hero-stat-label">Topics Covered</div>
            </div>
            <div>
              <div className="hero-stat-value">12k+</div>
              <div className="hero-stat-label">Monthly Readers</div>
            </div>
          </motion.div>
        </div>

        <HeroVisual />
        </div>
      </section>

      {featured && (
        <AnimatedSection className="section">
          <span className="section-eyebrow">Editor&apos;s Pick</span>
          <FeaturedPost post={featured} />
        </AnimatedSection>
      )}

      <AnimatedSection className="section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">Fresh off the press</span>
            <h2>Latest Articles</h2>
          </div>
          <Link className="btn btn-ghost" to="/blog">
            View all <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="blog-grid">
          {latest.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">Reader favorites</span>
            <h2>Popular Right Now</h2>
          </div>
        </div>
        <div className="blog-grid">
          {popular.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">Explore by topic</span>
            <h2>Categories</h2>
          </div>
          <Link className="btn btn-ghost" to="/categories">
            View all <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="categories-grid">
          {categories.slice(0, 4).map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </AnimatedSection>

      <section className="section container">
        <Newsletter />
      </section>
    </PageTransition>
  );
}
