const productService = require('../services/product_service');

const getAll = async (req, res) => {
  const allProducts = await productService.getAll();

  return res.status(200).json(allProducts);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAll,
  getById,
};