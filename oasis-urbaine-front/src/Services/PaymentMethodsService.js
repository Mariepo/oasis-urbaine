import axios from "axios";
import URL from "./config";

class PaymentMethodsService {

    static fetchPaymentMethods() {
        return axios.get(`${URL}/payments`)
    }

}

export default PaymentMethodsService;