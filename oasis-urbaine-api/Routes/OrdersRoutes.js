const express = require('express');
const OrdersController = require('../Controllers/OrdersControllers');
const AuthenticateController = require('../Controllers/AuthenticateController');

const router = express.Router();

router.get("/:id", AuthenticateController.authenticateToken, (request, result) => {OrdersController.getOrderById(request, result)});

router.get("/user/:id", AuthenticateController.authenticateToken, (request, result) => { OrdersController.getOrdersByUserId(request, result);});

router.post("/", AuthenticateController.authenticateToken, (request, result) => { OrdersController.addOrder(request, result);})

module.exports = router;