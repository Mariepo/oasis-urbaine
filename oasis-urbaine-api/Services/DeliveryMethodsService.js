const DeliveryMethods = require('../Models/DeliveryMethods');

class DeliveryMethodsService {

        async getDeliveryMethodById(id){
            return await DeliveryMethods.findByPk(id);
        }

}

module.exports = new DeliveryMethodsService();