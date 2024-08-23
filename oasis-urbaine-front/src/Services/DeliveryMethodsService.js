import axios from "axios";
import URL from "./config";

class DeliveryMethodsService {
    static fetchDeliveryMethods () {
        return axios.get(`${URL}/delivery`);
    }
}

export default DeliveryMethodsService;