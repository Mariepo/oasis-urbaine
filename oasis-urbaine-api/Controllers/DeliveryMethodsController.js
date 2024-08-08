const DeliveryMethodsService = require('../Services/DeliveryMethodsService')

class DeliveryMethodsController {

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