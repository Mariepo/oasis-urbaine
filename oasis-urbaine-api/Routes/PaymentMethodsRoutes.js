const express = require('express');
const PaymentMethodsController = require('../Controllers/PaymentMethodsController');

const router = express.Router();

router.get("/", (request, result) => {PaymentMethodsController.getAllPayments(request, result)});
router.get("/:id", (request, result) => {PaymentMethodsController.getPaymentById(request, result)});

module.exports = router;