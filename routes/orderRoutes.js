const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const order = new Order({ userId, items, totalAmount, address});
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all orders
router.get('/', async (req, res) => {
    try {
      
      const orders = Order.find()
      res.status(201).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
// get all orders by user
router.get('/user/:userId', async (req, res) => {
    try {
      const { userId} = req.params;
      const orders = Order.find({userId: userId})
      res.status(201).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // get order by id 
router.get('/user/:orderId', async (req, res) => {
    try {
      const { orderId} = req.params;
      const order = Order.find({_id: orderId})
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



module.exports = router;
