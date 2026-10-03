import express from "express";
import DoseHistory from "../models/DoseHistory.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

// GET all dose history for logged in user
router.get("/", checkToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await DoseHistory.find({ userId }).sort({
      takenAt: -1,
      createdAt: -1,
    });

    res.status(200).json(history);
  } catch (error) {
    console.error("GET DOSE HISTORY ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch dose history",
      error: error.message,
    });
  }
});

// POST record a dose as taken or missed
router.post("/", checkToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      medicineId,
      medicineName,
      dosage,
      time,
      status = "taken",
      date,
      dateLabel,
    } = req.body;

    if (!medicineName) {
      return res.status(400).json({ message: "Medicine name is required" });
    }

    const todayStr = date || new Date().toISOString().split("T")[0];

    // Check if already logged for this medicine and date
    let existing = null;
    if (medicineId) {
      existing = await DoseHistory.findOne({
        userId,
        medicineId,
        date: todayStr,
      });
    }

    if (existing) {
      existing.status = status;
      existing.takenAt = new Date();
      if (time) existing.time = time;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newRecord = await DoseHistory.create({
      userId,
      medicineId: medicineId || null,
      medicineName,
      dosage: dosage || "",
      time: time || "",
      status,
      date: todayStr,
      dateLabel:
        dateLabel ||
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      takenAt: new Date(),
    });

    res.status(201).json(newRecord);
  } catch (error) {
    console.error("CREATE DOSE HISTORY ERROR:", error);
    res.status(500).json({
      message: "Failed to record dose history",
      error: error.message,
    });
  }
});

// DELETE a specific dose history item
router.delete("/:id", checkToken, async (req, res) => {
  try {
    const record = await DoseHistory.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("DELETE DOSE HISTORY ERROR:", error);
    res.status(500).json({
      message: "Failed to delete dose history",
      error: error.message,
    });
  }
});

export default router;
