const PaymentMethodsService = require("../Services/PaymentsMethodsService");

class PaymentMethodsController {

    async getAllPayments(request, result) {
        try {
            const paymentmethods = await PaymentMethodsService.getAllPayments();
            result.json(paymentmethods);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération des modes de paiment"});            
        }
    }

    async getPaymentById(request, result) {
        try {
            const paymentmethod = await PaymentMethodsService.getPaymentById(request.params.id);
            result.json(paymentmethod);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération du mode de paiment"});            
        }
    }

}

module.exports = new PaymentMethodsController;