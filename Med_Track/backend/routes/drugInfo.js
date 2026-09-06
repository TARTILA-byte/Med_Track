import express from "express";
import DrugInfo from "../models/DrugInfo.js";

const router = express.Router();

// GET all drug references
router.get("/", async (req, res) => {
  try {
    const drugs = await DrugInfo.find();
    res.status(200).json(drugs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch drug references",
      error: error.message,
    });
  }
});

// GET single drug by ID
router.get("/:id", async (req, res) => {
  try {
    const drug = await DrugInfo.findById(req.params.id);
    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }
    res.status(200).json(drug);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch drug info",
      error: error.message,
    });
  }
});

// POST new drug reference
router.post("/", async (req, res) => {
  try {
    const drug = await DrugInfo.create(req.body);
    res.status(201).json(drug);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add drug reference",
      error: error.message,
    });
  }
});

export default router;
