const DeliveryMethodsService = require('../Services/DeliveryMethodsService')

class DeliveryMethodsController {

    async getAllDeliveryMethods(request, result) {
        try {
            const deliverymethods = await DeliveryMethodsService.getAllDeliveryMethods();
            result.json(deliverymethods);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération des modes de livraison"});
        }
    }

    async getDeliveryMethodById(request, result) {
        try {
            const deliverymethod = await DeliveryMethodsService.getDeliveryMethodById(request.params.id);
            result.json(deliverymethod);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération du mode de livraison"});
        }
    }


}

module.exports = new DeliveryMethodsController();