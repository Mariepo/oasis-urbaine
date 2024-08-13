const OrderItems = require('../Models/OrderItems');

class OrderItemsService {
    async addOrderItem(orderItem) {
        return await OrderItems.create(orderItem);
    }
}

module.exports = new OrderItemsService();
