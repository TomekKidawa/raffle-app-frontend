import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const getAll = (params) =>{
    return axios.get(API_URL + "/find", {params} );
}

const getAllPublic = (params) =>{
    return axios.get(API_URL + "/findallpublic", {params});
}
const getAllNonPublic = () =>{
    return axios.get(API_URL + "/findallnonpublic");
}

const getAllPublicByCategory = (id) =>{
    return axios.get(API_URL + `/category/${id}`)
}

const findForCurrentRaffles = (id) =>{
    return axios.get(API_URL + `/profile/currentraffles/${id}`)
}

const getOne = (id) =>{
    return axios.get(API_URL + `/find/${id}`);
}

const getOneNoPop = (id) =>{
    return axios.get(API_URL + `/findnopop/${id}`);
}

const addProduct = (data) =>{
    return axios.post(API_URL + `/add` , data)
}

const editProduct = (id, data) =>{
    return axios.put(API_URL + `/update/${id}`, data)
}

const deleteProduct = (id) =>{
    return axios.delete(API_URL + `/delete/${id}`)
}

const addtoraffle = (id, data) =>{
    return axios.post(API_URL + `/addtoraffle/${id}`, data)
}

const removefromraffle = (id, data) =>{
    return axios.post(API_URL + `/removefromraffle/${id}`, data)
}

const drawTheWinner = (id) =>{
    return axios.post(API_URL + `/drawthewinner/${id}`)
}

const resetWinner = (id) =>{
    return axios.post(API_URL + `/resetwinner/${id}`)
}

///for mod
const findPublic = () =>{
    return axios.get(API_URL + `/findpublic`);
}
const findPurshased = () =>{
    return axios.get(API_URL + `/findpurshased`);
}
const findIsWinner = () =>{
    return axios.get(API_URL + `/findiswinner`);
}
const setPublic = (id) =>{
    return axios.post(API_URL + `/setpublic/${id}`);
}




const productService = {
    getAll,
    getAllPublic,
    getAllNonPublic,
    getAllPublicByCategory,
    findForCurrentRaffles,
    getOne,
    getOneNoPop,
    addProduct,
    editProduct,
    deleteProduct,
    addtoraffle,
    removefromraffle,
    drawTheWinner,
    resetWinner,
    findPublic,
    findPurshased,
    findIsWinner,
    setPublic,
  };

  export default productService;