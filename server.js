const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect("mongodb+srv://antima1998:iLn_8*AS-HZyHzj@cluster0.u3wn8tv.mongodb.net/shoppingwebsite?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
