const salesModel = require('../models/sales_model');

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const product = await salesModel.getById(id);

  if (!product) return null;

  return product;
};

module.exports = {
  getAll,
  getById,
};