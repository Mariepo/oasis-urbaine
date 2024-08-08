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

    async getOrdersByUserId(request, result) {
        try {
            const orders = await OrdersService.getOrdersByUserId(request.params.id);
            result.json(orders);
        } catch (error) {
            result.status(500);
            result.json({ error: "Une erreur est survenue lors de la récupération des commandes" });
        }
    }
}


module.exports = new OrdersController();