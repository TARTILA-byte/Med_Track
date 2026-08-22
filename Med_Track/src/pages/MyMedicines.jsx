import React from "react";
import "./MyMedicines.css";

function MyMedicines() {
  const myMedicines = [
    {
      id: 1,
      name: "Napa 500mg",
      category: "Painkiller",
      dosage: "500 mg",
      frequency: "Once a day",
      today: "2026-08-22",
      time: "08:00",
      startDate: "2026-08-22",
      endDate: "2026-08-27",
      quantity: "10",
      foodTiming: "After Food",
    },

    {
      id: 2,
      name: "Seclo 20mg",
      category: "Gastric",
      dosage: "20 mg",
      frequency: "Once a day",
      today: "2026-08-22",
      time: "09:00",
      startDate: "2026-08-22",
      endDate: "2026-08-30",
      quantity: "10",
      foodTiming: "Before Food",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Medicines</h1>
        <p>Your personal medicine schedule</p>
      </div>

      <div className="my-medicine-list">
        {myMedicines.map((medicine) => (
          <div className="my-medicine-card" key={medicine.id}>
            <h3>{medicine.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyMedicines;
