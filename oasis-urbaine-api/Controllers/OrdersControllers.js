const OrdersService = require('../Services/OrdersService')
const OrderItemsService = require('../Services/OrderItemsService');

class OrdersController {

    async getOrdersByUserId(request, result) {
        try {
            const orders = await OrdersService.getOrdersByUserId(request.params.id);
            result.json(orders);
        } catch (error) {
            result.status(500);
            result.json({ error: "Une erreur est survenue lors de la récupération des commandes" });
        }
    }

    async addOrder(request, result) {
        try {
            const order = await OrdersService.addOrder(request.body);
            const orderItems = await request.body.items;
            for (let item of orderItems) {
                await OrderItemsService.addOrderItem({
                    quantity: item.quantity,
                    id_order: order.id, 
                    id_user: request.body.id_user,  
                    id_product: item.id_product
                });
            }
            result.json(order);
        } catch (error) {
            result.status(500);
            result.json({ error: "Une erreur est survenue lors de la création de la commande" });
        }
    }
    
}


module.exports = new OrdersController();