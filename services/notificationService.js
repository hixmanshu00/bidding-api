const { Notification } = require('../models');

exports.createNotification = async (userId, message) => {
  const notification = await Notification.create({
    user_id: userId,
    message: message,
    is_read: false,
  });

  return notification;
};

exports.getNotifications = async (userId) => {
  const notifications = await Notification.findAll({
    where: { user_id: userId },
    order: [['created_at', 'DESC']], 
  });

  return notifications;
};

exports.markNotificationsAsRead = async (userId, notificationIds) => {
  await Notification.update(
    { is_read: true },
    { where: { user_id: userId, id: notificationIds } }
  );
};
