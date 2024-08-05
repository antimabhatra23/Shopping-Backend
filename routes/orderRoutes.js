const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const mongoose = require('mongoose');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount, address, status } = req.body;
    const estimatedDeliveryDate = new Date(); // Calculate based on current date and delivery logic
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7); // Example: delivery in 7 days

    // Convert productId strings to ObjectId
    const updatedItems = items.map(item => ({
      ...item,
      productId: new mongoose.Types.ObjectId(item.productId),
    }));

    const order = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      items: updatedItems,
      totalAmount,
      address,
      estimatedDeliveryDate,
      status
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.log({error});
    res.status(400).json({ message: error.message });
  }
});

// Get all orders for admin
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email phone').populate({
      path: 'items.productId',
      select: 'name price img', // Include imageUrl in the response
    }); // Await the query

    res.status(200).json(orders); // Use 200 status code for successful GET request
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId: userId }).populate({
      path: 'items.productId',
      select: 'name price img', // Include imageUrl in the response
    }).sort({ createdAt: -1 }); // Await the query
    res.status(200).json(orders); // Use 200 status code for successful GET request
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get order by id
router.get('/order/:orderId', async (req, res) => { // Fixed endpoint path
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId); // Await the query and use findById
    if (order) {
      res.status(200).json(order); // Use 200 status code for successful GET request
    } else {
      res.status(404).json({ message: 'Order not found' }); // Handle not found case
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
