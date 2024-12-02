const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define(
  'Order',
  {
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    client_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    book_ids: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false },
  },
  {
    tableName: 'orders',
  }
);

module.exports = Order;
