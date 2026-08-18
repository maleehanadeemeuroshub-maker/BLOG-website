export const categories = [
  {
    id: "web-development",
    name: "Web Development",
    icon: "🌐",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    description: "Modern build tools, architecture and best practices for the web.",
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    gradient: "linear-gradient(135deg, #22d3ee, #6366f1)",
    description: "Hooks, patterns, performance and everything React 19.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "🟨",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    description: "Language deep-dives, ES6+ features and runtime internals.",
  },
  {
    id: "ai",
    name: "AI",
    icon: "🤖",
    gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
    description: "How AI is reshaping the way we design and ship software.",
  },
  {
    id: "ui-ux",
    name: "UI/UX",
    icon: "🎨",
    gradient: "linear-gradient(135deg, #f472b6, #f59e0b)",
    description: "Design systems, interaction patterns and visual craft.",
  },
  {
    id: "css",
    name: "CSS",
    icon: "🎯",
    gradient: "linear-gradient(135deg, #34d399, #22d3ee)",
    description: "Layout, animation and the modern CSS toolbox.",
  },
  {
    id: "programming",
    name: "Programming",
    icon: "💻",
    gradient: "linear-gradient(135deg, #60a5fa, #34d399)",
    description: "Fundamentals, algorithms and writing code that lasts.",
  },
  {
    id: "career",
    name: "Developer Career",
    icon: "🚀",
    gradient: "linear-gradient(135deg, #fb923c, #f43f5e)",
    description: "Growth, interviews and building a career in tech.",
  },
];

export const getCategory = (id) => categories.find((c) => c.id === id);
