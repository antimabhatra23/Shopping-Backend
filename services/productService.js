const Product = require("../models/productModel");

const addProduct = async (
  name,
  color,
  description,
  img,
  price,
  category,
  size
) => {
  const product = new Product({
    name,
    color,
    description,
    img,
    price : parseInt(price),
    category,
    size,
  });

  await product.save();
  return { message: "Product Saved Succefully" };
};

const getProducts = async () => {
  const products = await Product.find();
  return { message: "success", products };
};

const productById = async (productId) => {
  const products = await Product.find({ _id: productId });
  return { message: "success", products };
};

module.exports = {
  addProduct,
  getProducts,
};
