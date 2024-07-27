const express = require('express');
const ProductsController = require('../Controllers/ProductsController');

const router = express.Router();

router.get("/", (request, result) => {ProductsController.getAllProducts(request, result)})

module.exports = router;