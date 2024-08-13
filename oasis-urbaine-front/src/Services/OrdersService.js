import axios from "axios";

class OrdersService {
    static fetchOrdersById(id) {
        return axios.get('http://127.0.0.1:3001/orders/user/'+id);
    }

    static addOrder(order) {
        return axios.post('http://127.0.0.1:3001/orders/', order);
    }
}

export default OrdersService
