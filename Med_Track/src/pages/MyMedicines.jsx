import React, { useContext } from "react";

import { MedicineContext } from "../context/MedicineContext";

const MyMedicines = () => {
  const { myMedicines, deleteMedicine } = useContext(MedicineContext);

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Medicines</h1>

        <p>Your personal medicine schedule</p>
      </div>

      {myMedicines.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💊</div>

          <h2>No Medicines Added</h2>

          <p>Go to All Medicines and add your medicines.</p>
        </div>
      ) : (
        <div className="my-medicine-list">
          {myMedicines.map((medicine) => (
            <div className="my-medicine-card" key={medicine.id}>
              <div className="card-top">
                <div>
                  <span className="medicine-badge">{medicine.category}</span>

                  <h2>💊 {medicine.name}</h2>
                </div>
              </div>

              <div className="medicine-info">
                <p>
                  <strong>Dosage</strong>
                  <span>{medicine.dosage || "Not set"}</span>
                </p>

                <p>
                  <strong>Frequency</strong>
                  <span>{medicine.frequency || "Not set"}</span>
                </p>

                <p>
                  <strong>Today</strong>
                  <span>{medicine.today || "Not set"}</span>
                </p>

                <p>
                  <strong>Time</strong>
                  <span>{medicine.time || "Not set"}</span>
                </p>

                <p>
                  <strong>Start Date</strong>
                  <span>{medicine.startDate || "Not set"}</span>
                </p>

                <p>
                  <strong>End Date</strong>
                  <span>{medicine.endDate || "Not set"}</span>
                </p>

                <p>
                  <strong>Quantity</strong>
                  <span>{medicine.quantity || "Not set"}</span>
                </p>

                <p>
                  <strong>Food Timing</strong>
                  <span>{medicine.foodTiming || "Not set"}</span>
                </p>
              </div>

              <div className="medicine-actions">
                <button className="taken-button">✓ Taken</button>

                <button className="missed-button">✕ Missed</button>

                <button
                  className="delete-button"
                  onClick={() => deleteMedicine(medicine.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMedicines;
