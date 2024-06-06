const express = require('express');
const passport = require('passport');
const { getBidsByItemId, placeBid } = require('../controllers/bidController');

const router = express.Router();

router.get('/:itemId/bids', getBidsByItemId);
router.post('/:itemId/bids', passport.authenticate('jwt', { session: false }), placeBid);

module.exports = router;
