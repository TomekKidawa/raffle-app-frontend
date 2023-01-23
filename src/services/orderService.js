import axios from "axios";

const API_URL = "http://localhost:8080/api/order";

const createOrder = (data) =>{
    return axios.post(API_URL + "/add" , data);
}

const findAll = () =>{
    return axios.get(API_URL + `/find`)
}

const findOne = (id) =>{
    return axios.get(API_URL + `/findone/${id}`)
}

const getOrdersSpecUser = (id) =>{
    return axios.get(API_URL + `/findalltospec/${id}`);
}

const editOne = (id, data) =>{
    return axios.put(API_URL + `/edit/${id}`, data);
}

const orderService = {
    createOrder,
    findAll,
    findOne,
    getOrdersSpecUser,
    editOne
};

export default orderService;