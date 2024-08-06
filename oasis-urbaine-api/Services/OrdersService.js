const Orders = require('../Models/Orders');

class OrdersService {
    async getOrderById(id) {
        return await Orders.findByPk(id);
    }

    async getOrdersByUserId(id) {
        return await Orders.findAll({
            where: {
                id_user: id
            }
        });
    }
}

module.exports = new OrdersService();
