import axios from "axios";

class DeliveryMethodsService {
    static fetchDeliveryMethods () {
        return axios.get('http://127.0.0.1:3001/delivery');
    }
}

export default DeliveryMethodsService;