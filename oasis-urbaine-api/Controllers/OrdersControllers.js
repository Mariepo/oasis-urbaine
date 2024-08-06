const OrdersService = require('../Services/OrdersService')

class OrdersController {

    async getOrderById(request, result) {
        try {
            const order = await OrdersService.getOrderById(request.params.id);
            result.json(order);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération de la commande"});
        }
    }

}

module.exports = new OrdersController();