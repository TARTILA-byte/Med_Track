import React from "react";
import "./MedicineCard.css";
const MedicineCard = ({ medicine }) => {
  return (
    <div className="medicine-card">
      <div className="medicine-icon">💊</div>

      <h3>{medicine.name}</h3>

      <p>
        <strong>Generic:</strong> {medicine.genericName}
      </p>

      <p>
        <strong>Category:</strong> {medicine.category}
      </p>

      <button className="green-button">+ Add to My Medicines</button>
    </div>
  );
};

export default MedicineCard;
