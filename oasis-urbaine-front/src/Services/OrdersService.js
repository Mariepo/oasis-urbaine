import axios from "axios";
import URL from "./config";

class OrdersService {
    static fetchOrdersById(id) {
        return axios.get(`${URL}/orders/user/${id}`);
    }

    static addOrder(order) {
        return axios.post(`${URL}/orders/`, order);
    }
}

export default OrdersService
