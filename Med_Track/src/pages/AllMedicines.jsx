import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MedicineCard from "../components/MedicineCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const AllMedicines = () => {
  // Navigation
  const navigate = useNavigate();

  // Search
  const [search, setSearch] = useState("");

  // Category
  const [category, setCategory] = useState("All");

  // Medicine List
  const medicines = [
    {
      id: 1,
      name: "Napa 500mg",
      genericName: "Paracetamol",
      category: "Painkiller",
    },

    {
      id: 2,
      name: "Seclo 20mg",
      genericName: "Omeprazole",
      category: "Gastric",
    },

    {
      id: 3,
      name: "Napa Extra",
      genericName: "Paracetamol + Caffeine",
      category: "Painkiller",
    },

    {
      id: 4,
      name: "Fexo 120mg",
      genericName: "Fexofenadine",
      category: "Allergy",
    },

    {
      id: 5,
      name: "Vitamin C",
      genericName: "Ascorbic Acid",
      category: "Vitamin",
    },
  ];

  // Search + Category Filter

  const filteredMedicines = medicines.filter((medicine) => {
    const matchSearch = medicine.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "All" || medicine.category === category;

    return matchSearch && matchCategory;
  });

  // Add Button

  const handleAdd = (medicine) => {
    navigate("/add-medicine", {
      state: {
        medicine: medicine,
      },
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>All Medicines</h1>

        <p>Search for a medicine and add it to your personal medicine list.</p>
      </div>

      {/* Search + Filter */}

      <div className="filter-area">
        <SearchBar search={search} setSearch={setSearch} />

        <CategoryFilter category={category} setCategory={setCategory} />
      </div>

      {/* Medicine Cards */}

      <div className="medicine-grid">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onAdd={handleAdd}
            />
          ))
        ) : (
          <div className="no-result">No medicine found.</div>
        )}
      </div>
    </div>
  );
};

export default AllMedicines;
