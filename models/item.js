module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    starting_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    current_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    hooks: {
      beforeCreate: (item, options) => {
        item.current_price = item.starting_price;
      }
    }
  });

  return Item;
};
