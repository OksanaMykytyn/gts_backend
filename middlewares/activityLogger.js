const db = require("../models");

module.exports = async function logActivity(action, userId, postId = null) {
  try {
    await db.ActivityLog.create({
      user_id: userId,
      action,
      post_id: postId,
    });
  } catch (err) {
    console.error("Activity log error:", err.message);
  }
};
