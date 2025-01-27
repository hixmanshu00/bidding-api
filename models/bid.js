module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('Bid', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Items',
          key: 'id',
        },
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
      bid_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return Bid;
  };
  