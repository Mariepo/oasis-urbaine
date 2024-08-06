import axios from "axios";

class OrdersService {
    static fetchOrdersById(id) {
        return axios.get(`http://127.0.0.1:3001/orders/${id}/user`);
    }
}

export default OrdersService
