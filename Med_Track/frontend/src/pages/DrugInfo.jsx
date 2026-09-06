import React, { useState, useEffect } from "react";
import "./DrugInfo.css";

function DrugInfo() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/druginfo")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch drug data");
        return res.json();
      })
      .then((data) => {
        setDrugs(data);
        if (data.length > 0) {
          setSelectedDrug(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching drug info:", err);
        setError("Could not load medications from database.");
        setLoading(false);
      });
  }, []);

  const filteredDrugs = drugs.filter(
    (drug) =>
      drug.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="drug-info-container">
      <header className="drug-info-header">
        <h1>Drug Reference</h1>
        <p>Clinical information, mechanisms, interactions, and warnings for common medications.</p>
      </header>

      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search medications or drug class..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="drug-info-layout">
        <div className="drug-list">
          <span className="list-count">{filteredDrugs.length} MEDICATIONS</span>
          {filteredDrugs.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "10px" }}>No medications match your search.</p>
          ) : (
            filteredDrugs.map((drug) => {
              const drugKey = drug._id || drug.id;
              const isSelected = (selectedDrug?._id && selectedDrug._id === drug._id) || (selectedDrug?.id && selectedDrug.id === drug.id) || selectedDrug?.name === drug.name;
              return (
                <div
                  key={drugKey}
                  className={`drug-card ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedDrug(drug)}
                >
                  <h3>{drug.name}</h3>
                  <p>{drug.category}</p>
                </div>
              );
            })
          )}
        </div>

        {selectedDrug && (
          <div className="drug-details">
            <h2>{selectedDrug.name}</h2>
            <span className="badge">{selectedDrug.category}</span>

            <div className="detail-section">
              <h4>INDICATIONS & USES</h4>
              <p>{selectedDrug.indications}</p>
            </div>

            <div className="detail-section">
              <h4>MECHANISM OF ACTION</h4>
              <div className="mechanism-box">
                <p>{selectedDrug.mechanism}</p>
              </div>
            </div>

            <div className="grid-2col">
              <div className="detail-section">
                <h4>DOSAGE RANGE</h4>
                <div className="dosage-box">
                  <p>{selectedDrug.dosage}</p>
                </div>
              </div>

              <div className="detail-section">
                <h4>SIDE EFFECTS</h4>
                <div className="tags-container">
                  {selectedDrug.sideEffects.map((effect, idx) => (
                    <span key={idx} className="tag">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid-2col">
              <div className="detail-section">
                <h4>DRUG INTERACTIONS</h4>
                <div className="tags-container">
                  {selectedDrug.interactions.map((item, idx) => (
                    <span key={idx} className="tag tag-orange">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>WARNINGS</h4>
                <div className="tags-container">
                  {selectedDrug.warnings.map((warn, idx) => (
                    <span key={idx} className="tag tag-red">
                      {warn}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DrugInfo;
