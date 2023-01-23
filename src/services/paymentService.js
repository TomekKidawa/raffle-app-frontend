import axios from "axios";

const API_URL = "http://localhost:8080/api/payment";

const createPayment = (data) =>{
    return axios.post(API_URL + "/create", data);
}

const paymentService = {
    createPayment
};

export default paymentService;