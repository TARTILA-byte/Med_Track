import React, { useState } from "react";
import "./DrugInfo.css";

const drugDatabase = [
  {
    id: "metformin",
    name: "Metformin",
    category: "Biguanide Antidiabetic",
    indications:
      "First-line treatment for type 2 diabetes mellitus. Reduces hepatic glucose production and improves insulin sensitivity in peripheral tissues.",
    mechanism:
      "Activates AMPK (AMP-activated protein kinase), inhibiting mitochondrial complex I, thereby reducing gluconeogenesis and glycogenolysis in the liver.",
    dosage: "500mg – 2,550mg per day, in divided doses",
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Abdominal discomfort",
      "Metallic taste",
      "Vitamin B12 deficiency (long-term)",
    ],
    interactions: ["Alcohol", "Iodinated contrast media"],
    warnings: ["Contraindicated in severe renal impairment", "Risk of lactic acidosis"],
  },
  {
    id: "lisinopril",
    name: "Lisinopril",
    category: "ACE Inhibitor",
    indications:
      "Treatment of hypertension, heart failure, and post-myocardial infarction.",
    mechanism:
      "Inhibits angiotensin-converting enzyme (ACE), preventing conversion of angiotensin I to angiotensin II.",
    dosage: "10mg – 40mg once daily",
    sideEffects: ["Dry cough", "Dizziness", "Hyperkalemia", "Headache"],
    interactions: ["Potassium supplements", "NSAIDs", "Lithium"],
    warnings: ["Risk of angioedema", "Contraindicated during pregnancy"],
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin",
    category: "HMG-CoA Reductase Inhibitor (Statin)",
    indications:
      "Hypercholesterolemia and cardiovascular disease risk reduction.",
    mechanism:
      "Competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol synthesis.",
    dosage: "10mg – 80mg once daily",
    sideEffects: ["Myalgia", "Nasopharyngitis", "Arthralgia", "Elevated LFTs"],
    interactions: ["CYP3A4 inhibitors", "Gemfibrozil", "Grapefruit juice"],
    warnings: ["Monitor liver enzymes", "Discontinue if unexplained muscle pain occurs"],
  },
];

function DrugInfo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(drugDatabase[0]);

  const filteredDrugs = drugDatabase.filter(
    (drug) =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            filteredDrugs.map((drug) => (
              <div
                key={drug.id}
                className={`drug-card ${selectedDrug?.id === drug.id ? "active" : ""}`}
                onClick={() => setSelectedDrug(drug)}
              >
                <h3>{drug.name}</h3>
                <p>{drug.category}</p>
              </div>
            ))
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
