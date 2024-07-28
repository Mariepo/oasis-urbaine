const express = require('express');
const CategoriesController = require('../Controllers/CategoriesController');

const router = express.Router();


router.get("/", (request, result) => {CategoriesController.getAllCategories(request, result)});
router.get("/:id", (request, result) => {CategoriesController.getCategoryById(request, result)});
router.post("/", (request, result) => {CategoriesController.addCategory(request, result)});
router.patch("/:id", (request, result) => {CategoriesController.updateCategory(request, result)});
router.delete("/:id", (request, result) => {CategoriesController.deleteCategory(request, result)});

module.exports = router;