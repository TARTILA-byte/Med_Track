import React from "react";

const AddMedicine = () => {
  return (
    <div className="page">
      <div className="form-container">
        <h1>Add Medicine Schedule</h1>

        <p className="form-subtitle">Set your medicine schedule</p>

        <form className="medicine-form">
          <label>Medicine Name</label>
          <input type="text" placeholder="Medicine Name" />

          <label>Category</label>
          <input type="text" placeholder="Category" />

          <label>Dosage</label>
          <input type="text" placeholder="Example: 500 mg" />

          <label>Frequency</label>

          <select>
            <option>Select Frequency</option>
            <option>Once a day</option>
            <option>Twice a day</option>
            <option>Three times a day</option>
            <option>Every 6 hours</option>
            <option>As needed</option>
          </select>

          <label>Time</label>
          <input type="time" />

          <label>Today</label>
          <input type="date" />

          <label>Start Date</label>
          <input type="date" />

          <label>End Date</label>
          <input type="date" />

          <label>Quantity</label>
          <input type="number" placeholder="Example: 10" />

          <label>Food Timing</label>

          <select>
            <option>Select</option>
            <option>Before Food</option>
            <option>After Food</option>
            <option>With Food</option>
            <option>Anytime</option>
          </select>

          <button type="button" className="save-button">
            Save Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
