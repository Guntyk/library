const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define(
  'Client',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    tableName: 'clients',
  }
);

module.exports = Client;
