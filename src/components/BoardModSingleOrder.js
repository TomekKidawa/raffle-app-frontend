import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import orderService from '../services/orderService';

import {MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBSpinner } from "mdb-react-ui-kit"

const BoardModSingleOrder = () => {
    const{id} = useParams();
    let navigate = useNavigate();
    
    const initialOrderState ={
        _id:null,
        email:"",
        address: "",
        firstName: "",
        lastName: "",
        city: "",
        postalCode: "",
        phone: "",
        isPaid: false,
        isShipped: false,
    }

    const [currentOrder, setCurrentOrder] = useState(initialOrderState);

    const getOrder = id => {
        orderService.findOne(id)
          .then(response => {
            setCurrentOrder(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

      useEffect(() => {
        if (id)
        getOrder(id);
      }, [id]);
    
      function test(){
        window.print("siemaaaaaaaaaaaa");
      };


    // const publish =()=>{
    //   setCurrentProduct({ ...currentProduct, isPublic: true }) 
    // }

    // const unPublish =()=>{
    //   setCurrentProduct({ ...currentProduct, isPublic: false }) 
    // }


  return (
    <div>
        siema 
        {currentOrder._id}
    </div>
    
  )

};
export default BoardModSingleOrder