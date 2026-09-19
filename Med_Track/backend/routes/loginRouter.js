import express from "express";
import { loginUser } from "../controllers/loginController.js";
import checkToken from "../middlewares/checkToken.js";


const router = express.Router();
router.post("/", loginUser);

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
    sameSite: "lax",
    secure: false,
    path: "/", 
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;