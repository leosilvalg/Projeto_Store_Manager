const express = require('express');
const productController = require('../controllers/product_controller');

const route = express.Router();

route.get('/', productController.getAll);
route.get('/:id', productController.getById);
route.post('/', productController.create);
route.put('/:id', productController.update);
route.post('/:id', productController.deleted);

module.exports = route;