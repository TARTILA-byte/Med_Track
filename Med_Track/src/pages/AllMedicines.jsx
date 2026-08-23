import React from "react";
import "./AllMedicines.css";
import MedicineCard from "../components/MedicineCard";
import SearchBar from "../components/SearchBar";
// import CategoryFilter from "../components/CategoryFilter";

function AllMedicines() {
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

    {
      id: 6,
      name: "Azithromycin",
      genericName: "Azithromycin",
      category: "Antibiotic",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>All Medicines</h1>

        <p>Search for a medicine and add it to your personal medicine list.</p>
      </div>

      <div className="filter-area">
        <SearchBar />

        {/* <CategoryFilter /> */}
      </div>

      <div className="medicine-grid">
        {medicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
}

export default AllMedicines;
