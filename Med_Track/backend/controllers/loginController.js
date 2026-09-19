import Users from "../models/Users.js";
import jwt from "jsonwebtoken";

const lifetime = "1h";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const formattedEmail = email.trim().toLowerCase();

    const user = await Users.findOne({ email: formattedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials (Wrong password)" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: lifetime,
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
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};