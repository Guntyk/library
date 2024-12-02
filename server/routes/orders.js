const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.get('/', async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Замовлення не знайдене' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

router.put('/:id', async (req, res) => {
  await Order.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  await Order.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
