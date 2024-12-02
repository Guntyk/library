const express = require('express');
const Client = require('../models/Client');
const router = express.Router();

router.get('/', async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
});

router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Клієнт не знайден' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const client = await Client.create(req.body);
  res.json(client);
});

router.put('/:id', async (req, res) => {
  await Client.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  await Client.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
