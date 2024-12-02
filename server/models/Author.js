const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Author = sequelize.define(
  'Author',
  {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.TEXT },
  },
  {
    tableName: 'authors',
  }
);

module.exports = Author;
