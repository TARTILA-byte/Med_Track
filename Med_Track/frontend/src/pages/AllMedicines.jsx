import React, { useEffect, useState } from "react";
import "./AllMedicines.css";
import api from "../api/api";
import MedicineCard from "../components/MedicineCard";
import SearchBar from "../components/SearchBar";

function AllMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const response = await api.get("/medicines");
        setMedicines(response.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load medicines. Please login again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines(); 
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
            <MedicineCard key={medicine._id || medicine.id} medicine={medicine} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllMedicines;
