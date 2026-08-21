import React from "react";

const CategoryFilter = ({ category, setCategory }) => {
  return (
    <select
      className="category-select"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="All">All Categories</option>

      <option value="Painkiller">Painkiller</option>

      <option value="Antibiotic">Antibiotic</option>

      <option value="Gastric">Gastric</option>

      <option value="Vitamin">Vitamin</option>

      <option value="Allergy">Allergy</option>
    </select>
  );
};

export default CategoryFilter;
