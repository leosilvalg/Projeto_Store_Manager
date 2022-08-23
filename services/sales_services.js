const salesModel = require('../models/sales_model');

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const product = await salesModel.getById(id);

  if (!product) return null;

  return product;
};

const create = async (sales) => {
  const saleId = await salesModel.createSale();

  await Promise.all(sales.map((s) =>
    salesModel.createSaleProduct(saleId, s.productId, s.quantity)));

  return { id: saleId, itemsSold: sales };
}; 

const deleted = async (id) => {
  const saleId = await salesModel.getById(id);

  if (!saleId) return null;

  const deleteSale = await salesModel.deleteSale(id);

  return deleteSale;
};

module.exports = {
  getAll,
  getById,
  create,
  deleted,
};