import express from "express";
import checkToken from "../middlewares/checkToken.js";
import { getNotifications, markAsRead } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", checkToken, getNotifications);
router.patch("/:id/read", checkToken, markAsRead);

export default router;