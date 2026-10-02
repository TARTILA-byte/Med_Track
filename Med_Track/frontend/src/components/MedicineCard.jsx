import React, { useState } from "react";
import api from "../api/api";
import "./MedicineCard.css"; // প্রয়োজন অনুযায়ী CSS পাথ দিন

const MedicineCard = ({ medicine }) => {
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // ডিফল্ট ডেট ও টাইম সেট করা
  const todayObj = new Date();
  const currentDate = todayObj.toISOString().split("T")[0];
  const currentTime = `${String(todayObj.getHours()).padStart(2, "0")}:${String(todayObj.getMinutes()).padStart(2, "0")}`;

  const [formData, setFormData] = useState({
    time: currentTime,
    today: currentDate,
    startDate: currentDate,
    endDate: "",
    quantity: "",
    foodTiming: medicine.foodTiming || "After Food",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToMyMedicines = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        medicineId: medicine._id || medicine.id,
        name: medicine.name,
        category: medicine.category,
        dosage: medicine.dosage,
        frequency: medicine.frequency,
        ...formData,
      };

      await api.post("/my-medicines", payload);
      alert(`${medicine.name} added to My Medicines successfully!`);
      setShowModal(false);
    } catch (error) {
      console.error("Add to My Medicines Error:", error);
      alert(
        error.response?.data?.message || "Failed to add medicine to your list.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="medicine-card">
      <h3>{medicine.name}</h3>
      <p>
        <strong>Category:</strong> {medicine.category}
      </p>
      <p>
        <strong>Dosage:</strong> {medicine.dosage}
      </p>
      <p>
        <strong>Frequency:</strong> {medicine.frequency}
      </p>
      <p>
        <strong>Food:</strong> {medicine.foodTiming || medicine.food}
      </p>

      <button
        className="add-to-my-medicines-btn"
        onClick={() => setShowModal(true)}
      >
        + Add to My Medicines
      </button>

      {/* Modal Popup for Schedule Setup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Schedule for {medicine.name}</h2>
            <form onSubmit={handleAddToMyMedicines}>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Today Date</label>
                <input
                  type="date"
                  name="today"
                  value={formData.today}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="e.g. 10"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Food Timing</label>
                <select
                  name="foodTiming"
                  value={formData.foodTiming}
                  onChange={handleChange}
                >
                  <option value="Before Food">Before Food</option>
                  <option value="After Food">After Food</option>
                  <option value="With Food">With Food</option>
                  <option value="Anytime">Anytime</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? "Saving..." : "Confirm & Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineCard;
