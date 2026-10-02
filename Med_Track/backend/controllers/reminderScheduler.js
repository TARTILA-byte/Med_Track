import MyMedicine from "../models/MyMedicine.js"; 
import Notification from "../models/notification.js";

export const startReminderCheck = () => {
  setInterval(async () => {
    try {
      const now = new Date();
     
      const targetTime = new Date(now.getTime() + 5 * 60 * 1000);

      const hours = String(targetTime.getHours()).padStart(2, "0");
      const minutes = String(targetTime.getMinutes()).padStart(2, "0");
      const timeString = `${hours}:${minutes}`; // e.g., "16:00"

      
      const medicines = await MyMedicine.find({ time: timeString });

      for (const med of medicines) {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const exists = await Notification.findOne({
          userId: med.userId,
          title: "Medicine Reminder ⏰",
          createdAt: { $gte: todayStart },
          message: { $regex: med.name },
        });

        if (!exists) {
          await Notification.create({
            userId: med.userId,
            title: "Medicine Reminder ⏰",
            message: `Time to take ${med.name} in 5 minutes!`,
            type: "warning",
            isRead: false,
          });
          console.log(`Notification created for ${med.name}`);
        }
      }
    } catch (err) {
      console.error("Reminder check error:", err.message);
    }
  }, 60000); 
};