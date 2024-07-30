const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes)

module.exports = app;
