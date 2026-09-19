import "dotenv/config";
import express from "express";
import { users, addUser } from "./data.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import Medicine from "./models/Medicine.js";
import MyMedicine from "./models/MyMedicine.js";
import loginRoutes from "./routes/loginRouter.js";
import registerRoutes from "./routes/register.js";
import checkToken from "./middlewares/checkToken.js";
import drugInfoRoutes from "./routes/drugInfo.js";
import adminRoutes from "./routes/adminRoutes.js";



if (!process.env.MONGO_URI) {
  console.error("CRITICAL ERROR: MONGO_URI is missing in your .env file!");
  process.exit(1);
}

const app = express();

const PORT = 4000;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

app.use(
  cors({

    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

// Routes
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/druginfo", drugInfoRoutes);
app.use("/api/admin", adminRoutes);
// Home
app.get("/", (req, res) => {
  res.status(200).json({
    message: " hi tartila",
  });
});

// Old Users API
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// Old User Add API
app.post("/", (req, res) => {
  const { name, email } = req.body;

  addUser({ name, email });

  res.status(201).json({
    message: "hi",
  });
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
// GET My Medicines
app.get("/api/my-medicines", checkToken, async (req, res) => {
  try {
    const myMedicines = await MyMedicine.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(myMedicines);
  } catch (error) {
    console.log("GET MY MEDICINES ERROR:", error);

    res.status(500).json({
      message: "Failed to get my medicines",
      error: error.message,
    });
  }
});

// POST My Medicine
app.post("/api/my-medicines", checkToken, async (req, res) => {
  try {
    const {
      medicineId,
      name,
      category,
      dosage,
      frequency,
      today,
      time,
      startDate,
      endDate,
      quantity,
      foodTiming,
    } = req.body;

    if (!name || !category || !dosage || !frequency) {
      return res.status(400).json({
        message: "Medicine name, category, dosage and frequency are required",
      });
    }

    const myMedicine = await MyMedicine.create({
      userId: req.user.id,
      medicineId,
      name,
      category,
      dosage,
      frequency,
      today,
      time,
      startDate,
      endDate,
      quantity,
      foodTiming,
    });

    res.status(201).json(myMedicine);
  } catch (error) {
    console.log("ADD MY MEDICINE ERROR:", error);

    res.status(500).json({
      message: "Failed to add medicine to My Medicines",
      error: error.message,
    });
  }
});

// DELETE My Medicine
app.delete("/api/my-medicines/:id", checkToken, async (req, res) => {
  try {
    const medicine = await MyMedicine.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    console.log("DELETE MY MEDICINE ERROR:", error);

    res.status(500).json({
      message: "Failed to delete medicine",
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
