const DeliveryMethods = require('../Models/DeliveryMethods');

class DeliveryMethodsService {

        async getAllDeliveryMethods(){
            return await DeliveryMethods.findAll();
        }

        async getDeliveryMethodById(id){
            return await DeliveryMethods.findByPk(id);
        }

}

module.exports = new DeliveryMethodsService();