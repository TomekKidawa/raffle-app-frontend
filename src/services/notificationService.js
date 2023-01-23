import axios from "axios";

const API_URL = "http://localhost:8080/api/notification";

const getAlltoSpecUser = (data) =>{
    return axios.post(API_URL + "/findalltospec" , data);
}

const addEnter = (data) =>{
    return axios.post(API_URL + `/addenter` , data)
}

const addExit = (data) =>{
    return axios.post(API_URL + `/addexit` , data)
}


const notificationService = {
   getAlltoSpecUser,
   addEnter,
   addExit
};

export default notificationService;