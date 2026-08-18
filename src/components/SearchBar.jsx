import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "Search articles..." }) {
  return (
    <div className="search-bar">
      <FiSearch size={17} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search articles"
      />
    </div>
  );
}
