import express from "express";
import MyMedicine from "../models/MyMedicine.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const allMyMedicines = await MyMedicine.find({ userId });

    // ১. Low stock alert (Quantity 3 বা তার কম হলে)
    const lowStockMedicines = allMyMedicines.filter((med) => {
      const qty = parseInt(med.quantity, 10);
      return !isNaN(qty) && qty <= 3;
    });

    // ২. Today's medicines summary
    const todayStr = new Date().toISOString().split("T")[0];
    const todayMedicines = allMyMedicines.filter((med) => {
      if (!med.startDate) return true;
      if (med.endDate && med.endDate < todayStr) return false;
      return med.startDate <= todayStr;
    });

    res.status(200).json({
      totalMedicines: allMyMedicines.length,
      todayTotal: todayMedicines.length,
      todayMedicines,
      lowStockMedicines,
    });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
});

export default router;
