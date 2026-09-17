import React, { useState } from "react";
import "./MedicineCard.css";
import api from "../api/api";

function MedicineCard({ medicine }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddMedicine = async () => {
    try {
      setAdding(true);

      await api.post("/my-medicines", {
        medicineId: medicine._id,
        name: medicine.name,
        category: medicine.category,
        dosage: medicine.dosage,
        frequency: medicine.frequency,
        foodTiming: medicine.beforeAfterFood,
      });

      setAdded(true);

      alert("Medicine added to My Medicines!");
    } catch (error) {
      console.error("Add Medicine Error:", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to add medicine. Please try again.");
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="medicine-card">
      <h3>{medicine.name}</h3>

      <p>Category: {medicine.category}</p>

      <p>Dosage: {medicine.dosage}</p>

      <p>Frequency: {medicine.frequency}</p>

      <p>Food: {medicine.beforeAfterFood}</p>

      <button
        className="green-button"
        onClick={handleAddMedicine}
        disabled={adding || added}
      >
        {adding
          ? "Adding..."
          : added
            ? "✓ Added to My Medicines"
            : "+ Add to My Medicines"}
      </button>
    </div>
  );
}

export default MedicineCard;
