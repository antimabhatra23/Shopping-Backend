const express = require('express');
const Cart = require('../models/cartModel');
const router = express.Router();

// Route to add a product to the cart
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // If cart exists for the user, check if the product already exists
      const itemIndex = cart.items.findIndex(item => item.productId == productId);

      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product does not exist in the cart, add it
        cart.items.push({ productId, quantity });
      }

      cart = await cart.save();
      return res.status(200).send(cart);
    } else {
      // No cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity }]
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

// Route to get the cart for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await Cart.findOne({ userId }).populate('items.productId');
  
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: 'Cart not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Something went wrong');
    }
  });

module.exports = router;
