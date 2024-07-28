const express = require('express');
const ProductsController = require('../Controllers/ProductsController');

const router = express.Router();

router.get("/", (request, result) => {ProductsController.getAllProducts(request, result)});
router.get("/:productId", (request, result) => {ProductsController.getProductById(request, result)});

module.exports = router;