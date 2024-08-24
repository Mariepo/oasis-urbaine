import axios from "axios";
import SERVER_URL from "./config";

class OrdersService {
    static fetchOrdersById(id) {
        return axios.get(`${SERVER_URL}/orders/user/${id}`);
    }

    static addOrder(order) {
        return axios.post(`${SERVER_URL}/orders/`, order);
    }
}

export default OrdersService
