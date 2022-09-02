const productModel = require('../models/product_model');

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return null;

  return product;
};

const create = async (name) => {
  const product = await productModel.createProduct({ name });

  if (!product) return null;

  return product;
};

const update = async (id, name) => {
  const productId = await productModel.getById(id);

  if (!productId) return null;

  const product = await productModel.updateProduct({ id, name });

  return product;
};

const deleted = async (id) => {
  const productId = await productModel.getById(id);

  if (!productId) return null;

  const product = await productModel.deleteProduct(id);

  return product;
};

const search = async (name) => {
  const product = await productModel.search(name);

  if (!product || product.length === 0) return null;

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
  search,
};
