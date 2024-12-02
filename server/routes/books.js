const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Книга не знайдена' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

router.put('/:id', async (req, res) => {
  const book = await Book.update(req.body, { where: { id: req.params.id } });
  res.json(book);
});

router.delete('/:id', async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
