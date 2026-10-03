import "dotenv/config";
import express from "express";
import { users, addUser } from "./data.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { co2 } from "@tgwf/co2";

import Medicine from "./models/Medicine.js";
import MyMedicine from "./models/MyMedicine.js";
import loginRoutes from "./routes/loginRouter.js";
import registerRoutes from "./routes/register.js";
import checkToken from "./middlewares/checkToken.js";
import drugInfoRoutes from "./routes/drugInfo.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notification.js";
import { startReminderCheck } from "./controllers/reminderScheduler.js";
import dashboardRoutes from "./routes/dashboardRouter.js";
import doseHistoryRoutes from "./routes/doseHistoryRouter.js";
if (!process.env.MONGO_URI) {
  console.error("CRITICAL ERROR: MONGO_URI is missing in your .env file!");
  process.exit(1);
}

const app = express();
const PORT = 4000;

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`,
  );
  next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH","DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// CO2 / Carbon Footprint Calculation
app.use((req, res, next) => {
  let requestBytes = 0;
  let responseBytes = 0;

  // Calculate request size
  if (req.body) {
    requestBytes += Buffer.byteLength(JSON.stringify(req.body),"utf8");
  }

  if (req.query) {
    requestBytes += Buffer.byteLength(JSON.stringify(req.query),"utf8");
  }
   if (req.headers) {
        requestBytes += Buffer.byteLength(JSON.stringify(req.headers),'utf8' );
    }
  // Override res.write
  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk) {
    if (chunk) {
      responseBytes += Buffer.byteLength(chunk, 'utf8');
    }

    originalWrite.apply(res, arguments);
  };

  // Override res.end
  res.end = function (chunk) {
    if (chunk) {
      responseBytes += Buffer.byteLength(chunk, 'utf8');
    }

    res.locals.totalBytes = requestBytes + responseBytes;
    const greenHost = false; // Set to true if your server is hosted on a green host

    const emissions = co2Emission.perByte(res.locals.totalBytes,greenHost);

    console.log(`Data transferred: ${res.locals.totalBytes} bytes`);
    console.log(`Estimated CO2 emissions: ${emissions.toFixed(3)} grams`);

    originalEnd.apply(res, arguments);
  };

  next();
});
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
app.use("/api/notifications", notificationRoutes);
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
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/dose-history", doseHistoryRoutes);
// Start server
// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  startReminderCheck();
});
