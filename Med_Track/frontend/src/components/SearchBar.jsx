import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ searchText, onSearch, medicines }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = medicines
    .filter((medicine) => {
      const name = medicine.name ? medicine.name.toLowerCase() : "";

      const search = searchText.toLowerCase();

      return search && name.startsWith(search);
    })
    .slice(0, 5);

  const handleSelect = (medicine) => {
    onSearch(medicine.name);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search medicine..."
        value={searchText}
        onChange={(e) => {
          onSearch(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
      />

      {/* Suggestions */}
      {showSuggestions && searchText && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((medicine) => (
            <div
              key={medicine._id}
              className="suggestion-item"
              onClick={() => handleSelect(medicine)}
            >
              <strong>{medicine.name}</strong>

              <span>{medicine.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
