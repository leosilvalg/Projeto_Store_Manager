const express = require('express');
const salesController = require('../controllers/sales_controller');
const validSales = require('../middlewares/salesValidation');

const route = express.Router();

route.get('/', salesController.getAll);
route.get('/:id', salesController.getById);
route.post('/', validSales.salesValid, validSales.productValid, salesController.create);
route.put('/:id', validSales.salesValid, validSales.productValid, salesController.update);
route.delete('/:id', salesController.deleted);

module.exports = route;