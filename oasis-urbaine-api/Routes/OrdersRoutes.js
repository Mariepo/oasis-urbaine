const express = require('express');
const OrdersController = require('../Controllers/OrdersControllers');
// const AuthenticateController = require('../Controllers/AuthenticateController');

const router = express.Router();

router.get("/:id", (request, result) => {OrdersController.getOrderById(request, result)});

module.exports = router;