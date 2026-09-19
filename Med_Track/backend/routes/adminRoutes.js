import express from "express";
import Admin from "../models/Admin.js";

const router = express.Router();

// Register Admin
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const formattedEmail = email.trim().toLowerCase();

    const existingAdmin = await Admin.findOne({ email: formattedEmail });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists with this email." });
    }

    const newAdmin = await Admin.create({
      name: name.trim(),
      email: formattedEmail,
      password,
      role: role || "Clinical Pharmacist",
      department: department || "Drug Information & Formulary",
    });

    return res.status(201).json({
      message: "Admin registered successfully.",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        department: newAdmin.department,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register admin.",
      error: error.message,
    });
  }
});

// Login Admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const formattedEmail = email.trim().toLowerCase();

    const admin = await Admin.findOne({ email: formattedEmail });
    if (!admin) {
      return res.status(404).json({ message: "Admin account not found with this email." });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.status(200).json({
      message: "Admin login successful.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        department: admin.department,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error during admin login.",
      error: error.message,
    });
  }
});

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch admins.",
      error: error.message,
    });
  }
});

export default router;
