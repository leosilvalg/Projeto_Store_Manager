const express = require('express');
const productController = require('../controllers/product_controller');

const route = express.Router();

route.get('/', productController.getAll);
route.get('/:id', productController.getById);

module.exports = route;