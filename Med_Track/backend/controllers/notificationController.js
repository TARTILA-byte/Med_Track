import Notification from "../models/notification.js";


export const getNotifications = async (req, res) => {
  try {
    
    const userId = req.user.id || req.user._id;

    
    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    
    const unreadCount = await Notification.countDocuments({
      userId,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      unreadCount,
      notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching notifications",
    });
  }
};


export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params; 
    const userId = req.user.id || req.user._id;

    
    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { isRead: true },
      { new: true } 
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Error updating notification:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while updating notification",
    });
  }
};