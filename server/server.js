require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));
app.use('/orders', require('./routes/orders'));
app.use('/clients', require('./routes/clients'));
app.use('/publishers', require('./routes/publishers'));

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT || 8080}`);
  });
});
