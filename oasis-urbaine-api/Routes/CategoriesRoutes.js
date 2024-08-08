const express = require('express');
const CategoriesController = require('../Controllers/CategoriesController');
const AuthenticateController = require('../Controllers/AuthenticateController');

const router = express.Router();


router.get("/", AuthenticateController.authenticateToken, (request, result) => {CategoriesController.getAllCategories(request, result)});
router.get("/:id", (request, result) => {CategoriesController.getCategoryById(request, result)});
router.post("/", AuthenticateController.authenticateToken, (request, result) => {CategoriesController.addCategory(request, result)});
router.patch("/:id", AuthenticateController.authenticateToken, (request, result) => {CategoriesController.updateCategory(request, result)});
router.delete("/:id", AuthenticateController.authenticateToken, (request, result) => {CategoriesController.deleteCategory(request, result)});
router.get("/:id/products", (request, result) => { CategoriesController.getProductsByCategoryId(request, result) });

module.exports = router;