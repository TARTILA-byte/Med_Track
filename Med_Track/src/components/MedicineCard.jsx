import React from "react";

const MedicineCard = ({ medicine, onAdd }) => {
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

      <button className="green-button" onClick={() => onAdd(medicine)}>
        + Add to My Medicines
      </button>
    </div>
  );
};

export default MedicineCard;
