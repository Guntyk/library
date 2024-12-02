const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const Book = sequelize.define(
  'Book',
  {
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    author_id: { type: DataTypes.INTEGER, allowNull: false },
    publisher_id: { type: DataTypes.INTEGER, allowNull: false },
    availability: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: 'books',
  }
);

module.exports = Book;
