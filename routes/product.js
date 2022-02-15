const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');


router.get('/', productController.getAllProduct);

router.post('/new', productController.createNewProduct);

router.put('/:id', productController.updateProduct);

module.exports = router;