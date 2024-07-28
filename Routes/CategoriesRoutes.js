const express = require('express');
const CategoriesController = require('../Controllers/CategoriesController');

const router = express.Router();


router.get("/", (request, result) => {CategoriesController.getAllCategories(request, result)});
router.get("/:id", (request, result) => {CategoriesController.getCategoryById(request, result)});

module.exports = router;