const PaymentMethods = require('../Models/PaymentMethods');

class PaymentMethodsService {

    async getAllPayments(){
        return await PaymentMethods.findAll();
    }

    async getPaymentById(id){
        return await PaymentMethods.findByPk(id);
    }

}

module.exports = new PaymentMethodsService();
