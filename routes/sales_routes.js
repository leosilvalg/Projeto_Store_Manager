const express = require('express');
const salesController = require('../controllers/sales_controller');

const route = express.Router();

route.get('/', salesController.getAll);
route.get('/:id', salesController.getById);
route.post('/', salesController.create);
route.delete('/:id', salesController.deleted);

module.exports = route;