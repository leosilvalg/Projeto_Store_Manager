const productModel = require('../models/product_model');

const salesValid = async (req, res, next) => {
  const productId = req.body.every((s) => s.productId !== undefined);
  const quantity = req.body.every((s) => s.quantity !== undefined);
  const quantityNumber = req.body.every((s) => s.quantity >= 1);

  if (productId === false) return res.status(400).json({ message: '"productId" is required' });
  if (quantity === false) return res.status(400).json({ message: '"quantity" is required' });
  if (quantityNumber === false) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const productValid = async (req, res, next) => {
  const validProduct = await Promise.all(req.body.map((s) => productModel.getById(s.productId)));

  if (validProduct.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  salesValid,
  productValid,
};
