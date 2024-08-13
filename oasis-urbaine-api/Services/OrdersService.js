const Orders = require('../Models/Orders');
const OrderItems = require('../Models/OrderItems');
const Products = require('../Models/Products');

class OrdersService {
    async getOrderById(id) {
        return await Orders.findByPk(id, {
            include: ['order_items']
        });
    }

    async getOrdersByUserId(id) {
        return await Orders.findAll({
            where: {
                id_user: id
            },
            include: [
                {
                    model: OrderItems,
                    as: 'order_items',
                    include: [
                        {
                            model: Products,
                            as: 'product'
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']] 
        });
    }

    async addOrder(order){
        return await Orders.create(order);
    }
    
}

module.exports = new OrdersService();
