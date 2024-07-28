const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', userRoutes);
app.use('/products', productRoutes);

module.exports = app;
