const itemService = require('../services/itemService');
const path = require('path');

exports.getAllItems = async (req, res) => {
  const items = await itemService.getAllItems(req.query);
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const item = await itemService.getItemById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const itemData = { ...req.body, image_url: req.file ? path.normalize(req.file.path) : null, user_id: req.user.dataValues.id };
    const item = await itemService.createItem(itemData);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const item = await itemService.updateItem(req.params.id, req.body);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

exports.deleteItem = async (req, res) => {
  const success = await itemService.deleteItem(req.params.id);
  if (success) {
    res.json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};
