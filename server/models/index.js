const Book = require('./Book');
const Author = require('./Author');
const Client = require('./Client');
const Publisher = require('./Publisher');
const { Order, OrderBook } = require('./Order');

Book.belongsTo(Author, { foreignKey: 'author_id', as: 'author' });
Author.hasMany(Book, { foreignKey: 'author_id' });

Book.belongsTo(Publisher, { foreignKey: 'publisher_id', as: 'publisher' });
Publisher.hasMany(Book, { foreignKey: 'publisher_id', as: 'books' });

Order.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
Client.hasMany(Order, { foreignKey: 'client_id', as: 'orders' });

module.exports = { Book, Author, Order, Client, Publisher };
