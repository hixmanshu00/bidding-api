const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../utils/validate');
const passport = require('passport');

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', passport.authenticate('jwt', { session: false }), getUserProfile);

module.exports = router;
