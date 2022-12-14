const productService = require('../services/product_service');

const NOT_FOUND = 'Product not found';

const getAll = async (req, res) => {
  const allProducts = await productService.getAll();

  return res.status(200).json(allProducts);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (!product) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const search = async (req, res) => {
  const { q } = req.query;
  const allProducts = await productService.getAll();

  if (!q) {
    return res.status(200).json(allProducts);
  }
    
  const product = await productService.search(q);

  if (product.error) {
    return res.status(404).json({ message: NOT_FOUND });
  }

  return res.status(200).json(product.data);
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productService.create(name);

    if (!product) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const product = await productService.update(id, name);

    if (!product) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.deleted(id);

    if (!product) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
  search,
};