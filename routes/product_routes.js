const express = require('express');
const productController = require('../controllers/product_controller');
const isNameValid = require('../middlewares/productValidation');

const route = express.Router();

route.get('/', productController.getAll);
route.get('/search', productController.search);
route.get('/:id', productController.getById);
route.post('/', isNameValid, productController.create);
route.put('/:id', isNameValid, productController.update);
route.delete('/:id', productController.deleted);

module.exports = route;