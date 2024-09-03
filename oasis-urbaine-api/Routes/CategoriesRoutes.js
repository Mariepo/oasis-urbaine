const express = require('express');
const CategoriesController = require('../Controllers/CategoriesController');
const AuthenticateController = require('../Controllers/AuthenticateController');

const router = express.Router();


router.get("/", (request, result) => {CategoriesController.getAllCategories(request, result)});
router.post("/", AuthenticateController.authenticateToken, AuthenticateController.authenticateAdmin, (request, result) => {CategoriesController.addCategory(request, result)});
router.patch("/:id", AuthenticateController.authenticateToken, AuthenticateController.authenticateAdmin, (request, result) => {CategoriesController.updateCategory(request, result)});
router.delete("/:id", AuthenticateController.authenticateToken, AuthenticateController.authenticateAdmin, (request, result) => {CategoriesController.deleteCategory(request, result)});
router.get("/:id/products", (request, result) => { CategoriesController.getProductsByCategoryId(request, result) });

module.exports = router;