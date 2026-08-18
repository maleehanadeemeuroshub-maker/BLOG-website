import { motion } from "framer-motion";
import { FiBookmark } from "react-icons/fi";
import { useBlog } from "../context/BlogContext";

export default function BookmarkButton({ postId, className = "" }) {
  const { isBookmarked, toggleBookmark } = useBlog();
  const active = isBookmarked(postId);

  return (
    <motion.button
      className={`icon-btn ${active ? "active" : ""} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(postId);
      }}
      whileTap={{ scale: 0.8 }}
      aria-label={active ? "Remove bookmark" : "Add bookmark"}
      title={active ? "Remove bookmark" : "Save for later"}
    >
      <motion.span
        initial={false}
        animate={{ scale: active ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.35 }}
        style={{ display: "flex" }}
      >
        <FiBookmark size={16} fill={active ? "currentColor" : "none"} />
      </motion.span>
    </motion.button>
  );
}
