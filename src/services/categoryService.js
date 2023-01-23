import axios from "axios";

const API_URL = "http://localhost:8080/api/category";

const addCategory = (data) =>{
    return axios.post(API_URL + "/add" , data);
}

const findAll = () =>{
    return axios.get(API_URL + `/find`);
}

const categoryService = {
    addCategory,
    findAll,
};

export default categoryService;