const express = require('express');
const Author = require('../models/Author');
const router = express.Router();

router.get('/', async (req, res) => {
  const authors = await Author.findAll();
  res.json(authors);
});

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Автор не знайдений' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const author = await Author.create(req.body);
  res.json(author);
});

router.put('/:id', async (req, res) => {
  await Author.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  await Author.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
