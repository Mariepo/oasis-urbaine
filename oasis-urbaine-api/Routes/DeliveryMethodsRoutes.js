const express = require('express');
const DeliveryMethodsController = require('../Controllers/DeliveryMethodsController');
// const AuthenticateController = require('../Controllers/AuthenticateController');

const router = express.Router();

router.get("/:id", (request, result) => {DeliveryMethodsController.getDeliveryMethodById(request, result)});

module.exports = router;