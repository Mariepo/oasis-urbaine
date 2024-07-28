const express = require('express');
const ProductsController = require('../Controllers/ProductsController');

const router = express.Router();


router.get("/", (request, result) => {ProductsController.getAllProducts(request, result)});
// router.get("/:CategoryId", (request, result) => {CategoryController.getProductsByCategoryId(request, result)});
router.get("/:productId", (request, result) => {ProductsController.getProductById(request, result)});
router.post("/", (request, result) => {ProductsController.addProduct(request, result)});
router.patch("/:productId", (result, request) => {ProductsController.updateProduct(request, result)});
router.delete("/:productId", (request, result) => {ProductsController.deleteProduct(request, result)});

module.exports = router;