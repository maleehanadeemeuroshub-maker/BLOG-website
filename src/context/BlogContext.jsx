import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { posts as allPosts } from "../data/posts";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  // Theme — dark is the default/fallback; a stored user choice (from the
  // toggle) always wins.
  const [theme, setTheme] = useLocalStorage("blog_theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // Bookmarks
  const [bookmarks, setBookmarks] = useLocalStorage("blog_bookmarks", []);

  const isBookmarked = (id) => bookmarks.includes(id);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  // Global blog state
  const [posts] = useState(allPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory]);

  const bookmarkedPosts = useMemo(
    () => posts.filter((p) => bookmarks.includes(p.id)),
    [posts, bookmarks]
  );

  const value = {
    theme,
    toggleTheme,
    bookmarks,
    isBookmarked,
    toggleBookmark,
    bookmarkedPosts,
    posts,
    filteredPosts,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlog must be used within a BlogProvider");
  return ctx;
}
