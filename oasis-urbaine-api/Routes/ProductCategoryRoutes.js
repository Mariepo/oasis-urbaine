const express = require('express');
const ProductCategoryController = require('../Controllers/ProductCategoryController');
const AuthenticateController = require('../Controllers/AuthenticateController');

const router = express.Router();


router.post("/", AuthenticateController.authenticateToken, AuthenticateController.authenticateAdmin, (request, result) => {ProductCategoryController.addProductCategory(request, result)});
router.delete("/:id", AuthenticateController.authenticateToken, AuthenticateController.authenticateAdmin, (request, result) => {ProductCategoryController.deleteProductCategoryByProductId(request, result)});


module.exports = router;