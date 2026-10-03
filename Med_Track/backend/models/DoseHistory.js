import mongoose from "mongoose";

const doseHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MyMedicine",
      required: false,
    },
    medicineName: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["taken", "missed"],
      default: "taken",
    },
    date: {
      type: String, // e.g. "2026-10-02"
      required: true,
    },
    dateLabel: {
      type: String, // e.g. "Friday, October 2"
      default: "",
    },
    takenAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const DoseHistory = mongoose.model("DoseHistory", doseHistorySchema);

export default DoseHistory;
