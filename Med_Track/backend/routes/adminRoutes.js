import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import checkToken from "../middlewares/checkToken.js";

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
    const token = jwt.sign(
          {
            id: admin._id,
            name: admin.name,
            email: admin.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
    
      
        res.cookie("token", token, {
          httpOnly: true,
          secure: false, 
          sameSite: "lax",
          maxAge: 60 * 60 * 1000, 
          path: "/",
        });

    return res.status(200).json({
      message: "Admin login successful.",
      token,
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


// Check if user is logged in
router.get("/check", checkToken, (req, res) => {
  return res.json({
    authenticated: true,
    user: req.user
  });
}); 

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    expires: new Date(0),
    maxAge: 0,
    sameSite: "lax",
    secure: false,
    path: "/", 
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
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
