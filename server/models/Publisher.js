const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Publisher = sequelize.define(
  'Publisher',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
  },
  {
    tableName: 'publishers',
  }
);

module.exports = Publisher;
