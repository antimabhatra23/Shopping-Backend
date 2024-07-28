const productService = require("../services/productService");

const addProduct = async (req, res) => {
  const { name, color, description, img, price, category, size } = req.body;
  try {
    const response = await productService.addProduct(
      name,
      color,
      description,
      img,
      price,
      category,
      size
    );
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ error: "Failed" });
  }
};

const getProducts = async (req, res) => {
  try {
    const response = await productService.getProducts();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
};
