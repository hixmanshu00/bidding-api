const Sequelize = require('sequelize');
const UserModel = require('./user');
const ItemModel = require('./item');
const BidModel = require('./bid');
const NotificationModel = require('./notification');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
});

const User = UserModel(sequelize, Sequelize);
const Item = ItemModel(sequelize, Sequelize);
const Bid = BidModel(sequelize, Sequelize);
const Notification = NotificationModel(sequelize, Sequelize);

User.hasMany(Bid, { foreignKey: 'user_id' });
Bid.belongsTo(User, { foreignKey: 'user_id' });

Item.hasMany(Bid, { foreignKey: 'item_id' });
Bid.belongsTo(Item, { foreignKey: 'item_id' });

User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  sequelize,
  User,
  Item,
  Bid,
  Notification,
};
