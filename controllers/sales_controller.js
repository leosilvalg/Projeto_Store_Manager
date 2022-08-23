const salesService = require('../services/sales_services');

const getAll = async (req, res) => {
  const allSales = await salesService.getAll();

  return res.status(200).json(allSales);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const createSale = await salesService.create(req.body);

    res.status(201).json(createSale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.deleted(id);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
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
  deleted,
};
