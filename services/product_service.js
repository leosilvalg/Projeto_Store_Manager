const productModel = require('../models/product_model');

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const product = productModel.getById(id);

  if (!product) return null;

  return product;
};

module.exports = {
  getAll,
  getById,
};
