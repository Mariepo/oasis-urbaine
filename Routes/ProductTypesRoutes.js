const express = require('express');
const ProductTypesController = require('../Controllers/ProductTypesController');

const router = express.Router();

router.get("/", (request, result) => {ProductTypesController.getAllProductTypes(request, result)})

module.exports = router;