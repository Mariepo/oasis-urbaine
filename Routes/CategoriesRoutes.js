const express = require('express');
const CategoriesController = require('../Controllers/CategoriesController');

const router = express.Router();


router.get("/", (request, result) => {CategoriesController.getAllCategories(request, result)});
// router.get("/:id", (request, result) => {ProductsController.getProductById(request, result)});
// router.post("/", (request, result) => {ProductsController.addProduct(request, result)});
// router.patch("/:id", (request, result) => {ProductsController.updateProduct(request, result)});
// router.delete("/:id", (request, result) => {ProductsController.deleteProduct(request, result)});

module.exports = router;