const { Item } = require('../models');
const { Op } = require('sequelize');

// const getAllItems = async () => {
//   try {
//     const items = await Item.findAll();
//     return items;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const getAllItems = async (query = {}) => {
  const {
    search = '',
    status = '',
    page = 1,
    limit = 2,
  } = query;

  let where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  if (status) {
    const now = new Date();
    if (status === 'active') {
      where.end_time = { [Op.gt]: now };
    } else if (status === 'ended') {
      where.end_time = { [Op.lte]: now };
    }
  }

  const offset = (parseInt(page) - 1) * parseInt(limit);

  const items = await Item.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset,
    order: [['created_at', 'DESC']],
  });

  return {
    items: items.rows,
    totalItems: items.count,
    totalPages: Math.ceil(items.count / parseInt(limit)),
    currentPage: parseInt(page),
  };
};

const getItemById = async (id) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  } catch (error) {
    console.log(error.message);
  }
};

const createItem = async (itemData) => {
  try {
    const item = await Item.create(itemData);
    return item;
  } catch (error) {
    console.log(error.message);
  }
};

const updateItem = async (id, itemData) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      throw new Error('Item not found');
    }
    await item.update(itemData);
    return item;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteItem = async (id) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      throw new Error('Item not found');
    }
    await item.destroy();
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
