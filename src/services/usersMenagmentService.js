import axios from "axios";

const API_URL = "http://localhost:8080/api/admin/";

const getAll = () =>{
    return axios.get(API_URL + "getusers");
}

const getOne = (id) =>{
    return axios.get(API_URL + `getusers/${id}`);
}

const editUser = (id, data) =>{
    return axios.put(API_URL + `edituser/${id}`, data)
}

const deleteUser = (id) =>{
    return axios.delete(API_URL + `deleteuser/${id}`)
}

const UserMenagmentService = {
    getAll,
    getOne,
    editUser,
    deleteUser,
  };

  export default UserMenagmentService;