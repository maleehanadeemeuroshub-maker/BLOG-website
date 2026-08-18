import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { categories } from "../data/categories";
import SearchBar from "../components/SearchBar";
import BlogCard from "../components/BlogCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";
import { useDebounce } from "../hooks/useDebounce";

export default function Blog() {
  const {
    filteredPosts,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    bookmarkedPosts,
  } = useBlog();

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(localQuery, 300);
  const showBookmarksOnly = searchParams.get("bookmarks") === "true";

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) setActiveCategory(category);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory, debouncedQuery, showBookmarksOnly]);

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    const next = new URLSearchParams(searchParams);
    if (id === "all") next.delete("category");
    else next.set("category", id);
    next.delete("bookmarks");
    setSearchParams(next);
  };

  const results = showBookmarksOnly ? bookmarkedPosts : filteredPosts;

  return (
    <PageTransition>
      <AnimatedSection className="section" density="low" intensity={0.28}>
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              {showBookmarksOnly ? "Your library" : "The Blog"}
            </span>
            <h2>{showBookmarksOnly ? "Saved Articles" : "All Articles"}</h2>
          </div>
        </div>

        <div className="blog-toolbar">
          <SearchBar value={localQuery} onChange={setLocalQuery} />
          <div className="filter-pills">
            <button
              className={`filter-pill ${activeCategory === "all" && !showBookmarksOnly ? "active" : ""}`}
              onClick={() => {
                handleCategoryClick("all");
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-pill ${activeCategory === cat.id && !showBookmarksOnly ? "active" : ""}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {!loading && (
          <p className="results-count">
            {results.length} {results.length === 1 ? "article" : "articles"} found
          </p>
        )}

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : results.length === 0 ? (
          <EmptyState
            icon={showBookmarksOnly ? "🔖" : "🔍"}
            title={showBookmarksOnly ? "No saved articles yet" : "No articles found"}
            message={
              showBookmarksOnly
                ? "Bookmark articles you love and they'll show up here."
                : "Try a different search term or category."
            }
          />
        ) : (
          <div className="blog-grid">
            {results.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </AnimatedSection>
    </PageTransition>
  );
}
