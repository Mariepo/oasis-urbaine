const Orders = require('../Models/Orders');

class OrdersService {

        async getOrderById(id){
            return await Orders.findByPk(id);
        }

}

module.exports = new OrdersService();