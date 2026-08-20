import { motion } from "framer-motion";
import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";

export default function Categories() {
  return (
    <PageTransition>
      <AnimatedSection className="section">
        <motion.div
          className="about-hero"
          style={{ padding: "40px 0 56px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow" style={{ textAlign: "center", display: "block" }}>
            Browse by topic
          </span>
          <h1>
            Find exactly what you&apos;re <span className="gradient-text">looking for</span>
          </h1>
          <p>
            Every article on DevNotes is organized into focused categories —
            pick a topic and dive in.
          </p>
        </motion.div>

        <div className="categories-grid">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
