const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const forgotpasswordRoutes = require('./routes/forgotpasswordRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // This will allow all origins to access your API

app.use('/api', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/forgot-password', forgotpasswordRoutes)
// app.use('/')

module.exports = app;
