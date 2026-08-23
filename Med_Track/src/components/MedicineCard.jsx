import React from "react";
import "./MedicineCard.css";
function MedicineCard({ medicine }) {
  return (
    <div className="medicine-card">
      <h3>{medicine.name}</h3>
      <h4>{medicine.genericName}</h4>
      {/* <h4>{medicine.category}</h4> */}

      <button className="green-button">+ Add to My Medicines</button>
    </div>
  );
}

export default MedicineCard;
