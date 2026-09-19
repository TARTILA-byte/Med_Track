import React, { useState } from "react";
import "./AddDrugReference.css";

function AddDrugReference() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dosage: "",
    indications: "",
    mechanism: "",
  });

  const [sideEffects, setSideEffects] = useState([]);
  const [currentSideEffect, setCurrentSideEffect] = useState("");

  const [interactions, setInteractions] = useState([]);
  const [currentInteraction, setCurrentInteraction] = useState("");

  const [warnings, setWarnings] = useState([]);
  const [currentWarning, setCurrentWarning] = useState("");

  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle standard text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Tag Handlers for Side Effects
  const handleAddSideEffect = () => {
    const trimmed = currentSideEffect.trim();
    if (trimmed && !sideEffects.includes(trimmed)) {
      setSideEffects([...sideEffects, trimmed]);
      setCurrentSideEffect("");
    }
  };

  const handleRemoveSideEffect = (itemToRemove) => {
    setSideEffects(sideEffects.filter((item) => item !== itemToRemove));
  };

  // Tag Handlers for Drug Interactions
  const handleAddInteraction = () => {
    const trimmed = currentInteraction.trim();
    if (trimmed && !interactions.includes(trimmed)) {
      setInteractions([...interactions, trimmed]);
      setCurrentInteraction("");
    }
  };

  const handleRemoveInteraction = (itemToRemove) => {
    setInteractions(interactions.filter((item) => item !== itemToRemove));
  };

  // Tag Handlers for Warnings
  const handleAddWarning = () => {
    const trimmed = currentWarning.trim();
    if (trimmed && !warnings.includes(trimmed)) {
      setWarnings([...warnings, trimmed]);
      setCurrentWarning("");
    }
  };

  const handleRemoveWarning = (itemToRemove) => {
    setWarnings(warnings.filter((item) => item !== itemToRemove));
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: "", text: "" });

    if (!formData.name.trim() || !formData.category.trim() || !formData.dosage.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please fill in all required fields: Name, Category, and Dosage.",
      });
      return;
    }

    if (!formData.indications.trim() || !formData.mechanism.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please provide clinical Indications and Mechanism of Action.",
      });
      return;
    }

    const payload = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      dosage: formData.dosage.trim(),
      indications: formData.indications.trim(),
      mechanism: formData.mechanism.trim(),
      sideEffects,
      interactions,
      warnings,
    };

    try {
      setIsSubmitting(true);
      const res = await fetch("http://localhost:4000/api/druginfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add medication to drug reference.");
      }

      await res.json();
      setStatusMessage({
        type: "success",
        text: `"${payload.name}" was successfully added to the Drug Reference database!`,
      });

      // Reset form
      setFormData({
        name: "",
        category: "",
        dosage: "",
        indications: "",
        mechanism: "",
      });
      setSideEffects([]);
      setInteractions([]);
      setWarnings([]);
    } catch (err) {
      console.error("Error adding drug reference:", err);
      setStatusMessage({
        type: "error",
        text: err.message || "An unexpected error occurred while saving.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-drug-container">
      <header className="add-drug-header">
        <span className="admin-chip">Clinical Admin Portal</span>
        <h1>Add Medicine to Drug Reference</h1>
        <p>
          Publish clinical reference monographs, pharmacology mechanisms, dosing guidelines, and
          interactions for patients and clinicians.
        </p>
      </header>

      {statusMessage.text && (
        <div className={`status-banner ${statusMessage.type}`}>
          {statusMessage.type === "success" ? "✓ " : "⚠ "}
          {statusMessage.text}
        </div>
      )}

      <form className="add-drug-form" onSubmit={handleSubmit}>
        {/* Section 1: Basic Clinical Identification */}
        <div className="form-card">
          <h3 className="section-title">1. General Identification</h3>

          <div className="form-row grid-2">
            <div className="form-group">
              <label htmlFor="name">
                Generic / Brand Name <span className="required">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Amoxicillin, Lisinopril, Metformin"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">
                Therapeutic Class / Category <span className="required">*</span>
              </label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="e.g. Antibiotic / Penicillin, ACE Inhibitor"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dosage">
              Dosage Range & Administration <span className="required">*</span>
            </label>
            <input
              id="dosage"
              name="dosage"
              type="text"
              placeholder="e.g. 250mg – 500mg orally every 8 hours"
              value={formData.dosage}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Section 2: Clinical Pharmacology */}
        <div className="form-card">
          <h3 className="section-title">2. Clinical Pharmacology</h3>

          <div className="form-group">
            <label htmlFor="indications">
              Indications & Clinical Uses <span className="required">*</span>
            </label>
            <textarea
              id="indications"
              name="indications"
              rows={3}
              placeholder="Describe primary uses, conditions treated, approved clinical indications..."
              value={formData.indications}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mechanism">
              Mechanism of Action <span className="required">*</span>
            </label>
            <textarea
              id="mechanism"
              name="mechanism"
              rows={3}
              placeholder="Explain biochemical and physiological mechanism of action..."
              value={formData.mechanism}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Section 3: Safety, Side Effects & Interactions */}
        <div className="form-card">
          <h3 className="section-title">3. Safety Profile & Interactions</h3>

          {/* Side Effects Tag Input */}
          <div className="form-group">
            <label>Known Side Effects</label>
            <div className="tag-input-row">
              <input
                type="text"
                placeholder="Type a side effect (e.g. Nausea) and press Add"
                value={currentSideEffect}
                onChange={(e) => setCurrentSideEffect(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSideEffect();
                  }
                }}
              />
              <button type="button" className="btn-add-tag" onClick={handleAddSideEffect}>
                + Add
              </button>
            </div>
            <div className="tags-display">
              {sideEffects.map((item, idx) => (
                <span key={idx} className="tag-chip">
                  {item}
                  <button
                    type="button"
                    className="tag-remove-btn"
                    onClick={() => handleRemoveSideEffect(item)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Drug Interactions Tag Input */}
          <div className="form-group">
            <label>Drug Interactions</label>
            <div className="tag-input-row">
              <input
                type="text"
                placeholder="Type interacting drug/class (e.g. Warfarin, NSAIDs) and press Add"
                value={currentInteraction}
                onChange={(e) => setCurrentInteraction(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddInteraction();
                  }
                }}
              />
              <button type="button" className="btn-add-tag" onClick={handleAddInteraction}>
                + Add
              </button>
            </div>
            <div className="tags-display">
              {interactions.map((item, idx) => (
                <span key={idx} className="tag-chip tag-orange">
                  {item}
                  <button
                    type="button"
                    className="tag-remove-btn"
                    onClick={() => handleRemoveInteraction(item)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Warnings Tag Input */}
          <div className="form-group">
            <label>Clinical Warnings & Black Box Warnings</label>
            <div className="tag-input-row">
              <input
                type="text"
                placeholder="Type clinical caution (e.g. Severe renal impairment) and press Add"
                value={currentWarning}
                onChange={(e) => setCurrentWarning(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddWarning();
                  }
                }}
              />
              <button type="button" className="btn-add-tag" onClick={handleAddWarning}>
                + Add
              </button>
            </div>
            <div className="tags-display">
              {warnings.map((item, idx) => (
                <span key={idx} className="tag-chip tag-red">
                  {item}
                  <button
                    type="button"
                    className="tag-remove-btn"
                    onClick={() => handleRemoveWarning(item)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-reset"
            onClick={() => {
              setFormData({
                name: "",
                category: "",
                dosage: "",
                indications: "",
                mechanism: "",
              });
              setSideEffects([]);
              setInteractions([]);
              setWarnings([]);
              setStatusMessage({ type: "", text: "" });
            }}
          >
            Clear Form
          </button>

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing to Reference..." : "Publish Drug Reference"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDrugReference;
