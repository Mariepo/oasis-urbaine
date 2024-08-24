import axios from "axios";
import SERVER_URL from "./config";

class DeliveryMethodsService {
    static fetchDeliveryMethods () {
        return axios.get(`${SERVER_URL}/delivery`);
    }
}

export default DeliveryMethodsService;