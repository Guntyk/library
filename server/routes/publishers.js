const express = require('express');
const Publisher = require('../models/Publisher');
const router = express.Router();

router.get('/', async (req, res) => {
  const publishers = await Publisher.findAll();
  res.json(publishers);
});

router.get('/:id', async (req, res) => {
  try {
    const publisher = await Publisher.findByPk(req.params.id);
    if (!publisher) {
      return res.status(404).json({ message: 'Видавництво не знайдено' });
    }
    res.json(publisher);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const publisher = await Publisher.create(req.body);
  res.json(publisher);
});

router.put('/:id', async (req, res) => {
  await Publisher.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  await Publisher.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
