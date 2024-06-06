const express = require('express');
const passport = require('passport');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/multer');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', passport.authenticate('jwt', { session: false }), roleMiddleware(['user', 'admin']), upload.single('image_url'), createItem);
router.put('/:id', passport.authenticate('jwt', { session: false }), roleMiddleware(['user', 'admin']), updateItem);
router.delete('/:id', passport.authenticate('jwt', { session: false }), roleMiddleware(['user', 'admin']), deleteItem);

module.exports = router;
