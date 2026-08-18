import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { posts } from "../data/posts";
import TiltCard from "./TiltCard";

export default function CategoryCard({ category, index = 0 }) {
  const count = posts.filter((p) => p.category === category.id).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard max={9} style={{ height: "100%" }}>
        <Link to={`/blog?category=${category.id}`} className="category-card">
          <div className="category-card-icon" style={{ background: category.gradient }}>
            {category.icon}
          </div>
          <div>
            <h3 className="category-card-title">{category.name}</h3>
            <p className="category-card-desc">{category.description}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="category-card-count">{count} articles</span>
            <FiArrowRight size={16} />
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
