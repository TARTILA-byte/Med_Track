import React, { useState } from "react";
import "./AddMedicine.css";
import api from "../api/api";

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dosage: "",
    frequency: "",
    time: "",
    today: "",
    startDate: "",
    endDate: "",
    quantity: "",
    foodTiming: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.dosage ||
      !formData.frequency
    ) {
      alert("Please fill in Medicine Name, Category, Dosage and Frequency.");

      return;
    }

    try {
      setSaving(true);

      await api.post("/my-medicines", formData);

      alert("Medicine saved successfully!");

      setFormData({
        name: "",
        category: "",
        dosage: "",
        frequency: "",
        time: "",
        today: "",
        startDate: "",
        endDate: "",
        quantity: "",
        foodTiming: "",
      });
    } catch (error) {
      console.error("Save Medicine Error:", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to save medicine.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>Add Medicine Schedule</h1>

        <p className="form-subtitle">Set your medicine schedule</p>

        <form className="medicine-form" onSubmit={handleSubmit}>
          <label>Medicine Name</label>

          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Category</label>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <label>Dosage</label>

          <input
            type="text"
            name="dosage"
            placeholder="Example: 500 mg"
            value={formData.dosage}
            onChange={handleChange}
          />

          <label>Frequency</label>

          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          >
            <option value="">Select Frequency</option>
            <option value="Once a day">Once a day</option>
            <option value="Twice a day">Twice a day</option>
            <option value="Three times a day">Three times a day</option>
            <option value="Every 6 hours">Every 6 hours</option>
            <option value="As needed">As needed</option>
          </select>

          <label>Time</label>

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />

          <label>Today</label>

          <input
            type="date"
            name="today"
            value={formData.today}
            onChange={handleChange}
          />

          <label>Start Date</label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />

          <label>End Date</label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />

          <label>Quantity</label>

          <input
            type="number"
            name="quantity"
            placeholder="Example: 10"
            value={formData.quantity}
            onChange={handleChange}
          />

          <label>Food Timing</label>

          <select
            name="foodTiming"
            value={formData.foodTiming}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Before Food">Before Food</option>
            <option value="After Food">After Food</option>
            <option value="With Food">With Food</option>
            <option value="Anytime">Anytime</option>
          </select>

          <button type="submit" className="save-button" disabled={saving}>
            {saving ? "Saving..." : "Save Medicine"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
