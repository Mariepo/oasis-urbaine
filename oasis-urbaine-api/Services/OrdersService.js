const Orders = require('../Models/Orders');

class OrdersService {
    async getOrderById(id) {
        return await Orders.findByPk(id);
    }

    async getOrdersByUserId(id) {
        return await Orders.findAll({
            where: {
                id_user: id
            }, 
            order: [['created_at', 'DESC']] 
        });
    }

    async addOrder(order){
        return await Orders.create(order);
    }
    
}

module.exports = new OrdersService();
