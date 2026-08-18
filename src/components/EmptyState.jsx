import { motion } from "framer-motion";

export default function EmptyState({
  icon = "🔍",
  title = "No results found",
  message = "Try adjusting your search or filters.",
  action = null,
}) {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="empty-state-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </motion.div>
  );
}
