import React, { useEffect, useState } from "react";
import "./AllMedicines.css";
import MedicineCard from "../components/MedicineCard";
import SearchBar from "../components/SearchBar";

function AllMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/medicines")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch medicines");
        }

        return response.json();
      })
      .then((data) => {
        setMedicines(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setError("Failed to load medicines.");
        setLoading(false);
      });
  }, []);

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

      {loading && <p>Loading medicines...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="medicine-grid">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine._id} medicine={medicine} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllMedicines;
