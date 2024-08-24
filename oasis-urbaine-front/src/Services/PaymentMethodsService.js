import axios from "axios";
import SERVER_URL from "./config";

class PaymentMethodsService {

    static fetchPaymentMethods() {
        return axios.get(`${SERVER_URL}/payments`)
    }

}

export default PaymentMethodsService;