const productService = require("../services/productService");
const formidable = require('formidable');
const fs = require('fs');

const addProduct = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err); // Log the error for debugging
      return res.status(400).send({ error: 'Failed to parse form' });
    }

    try {
      console.log(fields)

      const { name, color, description, price, category, size } = fields;
      console.log({name , color ,description, price, category, size })
      let img = null;

      if (files.img) {
        console.log("files.img", files.img)
        const imgBuffer = fs.readFileSync(files.img[0].filepath);
        img = `data:${files.img[0].mimetype};base64,${imgBuffer.toString('base64')}`;
      }


      console.log({img})

      if (img && !img.startsWith('data:image')) {
        return res.status(400).send({ error: 'Invalid image format' });
      }

      const response = await productService.addProduct(
        name[0],
        color[0],
        description[0],
        img,
        price[0],
        category[0],
        size[0]
      );
      res.status(201).send(response);
    } catch (error) {
      console.error('Product saving error:', error); // Log the error for debugging
      res.status(400).send({ error: 'Failed to add product' });
    }
  });
};

const getProducts = async (req, res) => {
  try {
    const response = await productService.getProducts();
    res.send(response);
  } catch (error) {
    console.error('Get products error:', error); // Log the error for debugging
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
};
