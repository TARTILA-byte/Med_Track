import express from "express";
import { users, addUser } from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Medicine from "./models/Medicine.js";

dotenv.config();

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

// GET all medicines
app.get("/api/medicines", async (req, res) => {
  try {
    const medicines = await Medicine.find();

    res.status(200).json(medicines);
  } catch (error) {
    console.log("GET MEDICINES ERROR:", error);

    res.status(500).json({
      message: "Failed to get medicines",
      error: error.message,
    });
  }
});

// POST new medicine
app.post("/api/medicines", async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add medicine",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
