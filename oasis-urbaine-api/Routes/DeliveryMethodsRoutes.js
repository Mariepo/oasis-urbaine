const express = require('express');
const DeliveryMethodsController = require('../Controllers/DeliveryMethodsController');

const router = express.Router();

router.get("/", (request, result) => {DeliveryMethodsController.getAllDeliveryMethods(request, result)});
router.get("/:id", (request, result) => {DeliveryMethodsController.getDeliveryMethodById(request, result)});

module.exports = router;