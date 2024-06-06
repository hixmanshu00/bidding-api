const express = require('express');
const passport = require('passport');
const { getNotifications, markNotificationsAsRead } = require('../controllers/notificationController');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getNotifications);
router.post('/mark-read', passport.authenticate('jwt', { session: false }), markNotificationsAsRead);

module.exports = router;
