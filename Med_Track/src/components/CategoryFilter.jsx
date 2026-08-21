import React from "react";

const CategoryFilter = () => {
  return (
    <select className="category-select">
      <option>All Categories</option>
      <option>Painkiller</option>
      <option>Antibiotic</option>
      <option>Gastric</option>
      <option>Vitamin</option>
      <option>Allergy</option>
    </select>
  );
};

export default CategoryFilter;
