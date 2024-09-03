const express = require('express');
const ProductsController = require('../Controllers/ProductsController');
const AuthenticateController = require('../Controllers/AuthenticateController');

const router = express.Router();

router.get("/", (request, result) => {ProductsController.getAllProducts(request, result)});
router.get("/:id", (request, result) => {ProductsController.getProductById(request, result)});
router.post("/", AuthenticateController.authenticateToken, AuthenticateController.authenticateAdmin, (request, result) => {ProductsController.addProduct(request, result)});
router.patch("/:id", AuthenticateController.authenticateToken, AuthenticateController.authenticateAdmin, (request, result) => {ProductsController.updateProduct(request, result)});
router.delete("/:id", AuthenticateController.authenticateToken, AuthenticateController.authenticateAdmin, (request, result) => {ProductsController.deleteProduct(request, result)});

module.exports = router;