import { motion } from "framer-motion";
import { authors } from "../data/authors";
import PageTransition from "../components/PageTransition";
import TiltCard from "../components/TiltCard";
import AnimatedSection from "../components/AnimatedSection";
import BorderBeam from "../components/BorderBeam";

const values = [
  {
    icon: "🎯",
    title: "Practical over trendy",
    desc: "We write about what actually helps you ship better software, not whatever is trending this week.",
  },
  {
    icon: "🔍",
    title: "Depth over noise",
    desc: "Every article is written by someone who has done the work, not summarized from a search results page.",
  },
  {
    icon: "🤝",
    title: "Honest takes",
    desc: "We call out trade-offs and downsides as clearly as the benefits — no hype, just what's true.",
  },
];

export default function About() {
  return (
    <PageTransition>
      <AnimatedSection className="section">
        <motion.div
          className="about-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow" style={{ textAlign: "center", display: "block" }}>
            About DevNotes
          </span>
          <h1>
            Writing for developers who <span className="gradient-text">build for real</span>
          </h1>
          <p>
            DevNotes started as a handful of internal notes shared between
            engineers on a growing frontend team. It's since grown into a
            publication read by thousands of developers who want clear,
            practical writing on the modern web — without the fluff.
          </p>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection className="section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">What we believe</span>
            <h2>Our Values</h2>
          </div>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard max={8} style={{ height: "100%" }}>
                <div className="value-card">
                  <BorderBeam />
                  <div className="value-card-icon">{v.icon}</div>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {v.desc}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">The people behind it</span>
            <h2>Meet the Writers</h2>
          </div>
        </div>
        <div className="team-grid">
          {Object.values(authors).map((author, i) => (
            <motion.div
              key={author.name}
              className="team-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <img src={author.avatar} alt={author.name} />
              <div className="team-card-name">{author.name}</div>
              <div className="team-card-role">{author.role}</div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
