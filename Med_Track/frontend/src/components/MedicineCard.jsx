import React from "react";
import "./MedicineCard.css";

function MedicineCard({ medicine }) {
  return (
    <div className="medicine-card">
      <h3>{medicine.name}</h3>

      <p>Category: {medicine.category}</p>

      <p>Dosage: {medicine.dosage}</p>

      <p>Frequency: {medicine.frequency}</p>

      <p>Food: {medicine.beforeAfterFood}</p>

      <button className="green-button">+ Add to My Medicines</button>
    </div>
  );
}

export default MedicineCard;
