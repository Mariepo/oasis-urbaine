import axios from "axios";

class PaymentMethodsService {

    static fetchPaymentMethods() {
        return axios.get('http://127.0.0.1:3001/payments')
    }

}

export default PaymentMethodsService;