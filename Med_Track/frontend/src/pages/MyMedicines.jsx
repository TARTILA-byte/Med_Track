import React, { useEffect, useState } from "react";
import "./MyMedicines.css";
import api from "../api/api";

function MyMedicines() {
  const [myMedicines, setMyMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyMedicines();
  }, []);

  const fetchMyMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/my-medicines");

      setMyMedicines(response.data);
    } catch (error) {
      console.error("Fetch My Medicines Error:", error);

      setError("Failed to load your medicines.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/my-medicines/${id}`);

      setMyMedicines(myMedicines.filter((medicine) => medicine._id !== id));

      alert("Medicine deleted successfully.");
    } catch (error) {
      console.error("Delete Medicine Error:", error);

      alert("Failed to delete medicine.");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Medicines</h1>

        <p>Your personal medicine schedule</p>
      </div>

      {loading && <p className="loading-message">Loading your medicines...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && myMedicines.length === 0 && (
        <div className="empty-message">
          <h3>No medicines added yet.</h3>

          <p>Go to All Medicines and add a medicine to your personal list.</p>
        </div>
      )}

      {!loading && !error && myMedicines.length > 0 && (
        <div className="my-medicine-list">
          {myMedicines.map((medicine) => (
            <div className="my-medicine-card" key={medicine._id}>
              <div className="medicine-card-header">
                <h3>{medicine.name}</h3>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(medicine._id)}
                >
                  Delete
                </button>
              </div>

              <div className="medicine-details">
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
                  <strong>Time:</strong> {medicine.time || "Not set"}
                </p>

                <p>
                  <strong>Today:</strong> {medicine.today || "Not set"}
                </p>

                <p>
                  <strong>Start Date:</strong> {medicine.startDate || "Not set"}
                </p>

                <p>
                  <strong>End Date:</strong> {medicine.endDate || "Not set"}
                </p>

                <p>
                  <strong>Quantity:</strong> {medicine.quantity || "Not set"}
                </p>

                <p>
                  <strong>Food Timing:</strong>{" "}
                  {medicine.foodTiming || "Not set"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyMedicines;
