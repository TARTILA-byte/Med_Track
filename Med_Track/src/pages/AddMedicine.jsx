import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MedicineContext } from "../context/MedicineContext";

const AddMedicine = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { addMedicine } = useContext(MedicineContext);

  const medicine = location.state?.medicine;

  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("");
  const [today, setToday] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodTiming, setFoodTiming] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMedicine = {
      ...medicine,

      id: Date.now(),

      dosage,
      frequency,
      time,
      today,
      startDate,
      endDate,
      quantity,
      foodTiming,
    };

    addMedicine(newMedicine);

    navigate("/my-medicines");
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>Add Medicine Schedule</h1>

        <p className="form-subtitle">Set your medicine schedule</p>

        <form className="medicine-form" onSubmit={handleSubmit}>
          {/* Medicine Name */}

          <label>Medicine Name</label>

          <input type="text" value={medicine?.name || ""} readOnly />

          {/* Category */}

          <label>Category</label>

          <input type="text" value={medicine?.category || ""} readOnly />

          {/* Dosage */}

          <label>Dosage</label>

          <input
            type="text"
            placeholder="Example: 500 mg"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />

          {/* Frequency */}

          <label>Frequency</label>

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          >
            <option value="">Select Frequency</option>

            <option value="Once a day">Once a day</option>

            <option value="Twice a day">Twice a day</option>

            <option value="Three times a day">Three times a day</option>

            <option value="Every 6 hours">Every 6 hours</option>

            <option value="As needed">As needed</option>
          </select>

          {/* Time */}

          <label>Time</label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          {/* Today */}

          <label>Today</label>

          <input
            type="date"
            value={today}
            onChange={(e) => setToday(e.target.value)}
          />

          {/* Start Date */}

          <label>Start Date</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          {/* End Date */}

          <label>End Date</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          {/* Quantity */}

          <label>Quantity</label>

          <input
            type="number"
            placeholder="Example: 10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          {/* Food Timing */}

          <label>Food Timing</label>

          <select
            value={foodTiming}
            onChange={(e) => setFoodTiming(e.target.value)}
          >
            <option value="">Select</option>

            <option value="Before Food">Before Food</option>

            <option value="After Food">After Food</option>

            <option value="With Food">With Food</option>

            <option value="Anytime">Anytime</option>
          </select>

          {/* Save */}

          <button type="submit" className="save-button">
            Save Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
