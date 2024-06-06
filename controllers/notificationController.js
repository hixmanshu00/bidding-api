const notificationService = require('../services/notificationService');

exports.getNotifications = async (req, res) => {
  console.log(req.user.id)
  const notifications = await notificationService.getNotifications(req.user.id);
  res.json(notifications);
};

exports.markNotificationsAsRead = async (req, res) => {
  await notificationService.markNotificationsAsRead(req.user.dataValues.id, req.body.notificationIds);
  res.json({ message: 'Notifications marked as read' });
};
