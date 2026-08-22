import React from "react";
import "./SearchBar.css";
function SearchBar() {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search medicine..."
    />
  );
}

export default SearchBar;
