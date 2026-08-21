import React from "react";

const MyMedicines = () => {
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
            <div className="card-top">
              <div>
                <span className="medicine-badge">{medicine.category}</span>

                <h2>💊 {medicine.name}</h2>
              </div>
            </div>

            <div className="medicine-info">
              <p>
                <strong>Dosage</strong>
                <span>{medicine.dosage}</span>
              </p>

              <p>
                <strong>Frequency</strong>
                <span>{medicine.frequency}</span>
              </p>

              <p>
                <strong>Today</strong>
                <span>{medicine.today}</span>
              </p>

              <p>
                <strong>Time</strong>
                <span>{medicine.time}</span>
              </p>

              <p>
                <strong>Start Date</strong>
                <span>{medicine.startDate}</span>
              </p>

              <p>
                <strong>End Date</strong>
                <span>{medicine.endDate}</span>
              </p>

              <p>
                <strong>Quantity</strong>
                <span>{medicine.quantity}</span>
              </p>

              <p>
                <strong>Food Timing</strong>
                <span>{medicine.foodTiming}</span>
              </p>
            </div>

            <div className="medicine-actions">
              <button className="taken-button">✓ Taken</button>

              <button className="missed-button">✕ Missed</button>

              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMedicines;
