import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { useSelector } from "react-redux";
import {MDBBtn,} from 'mdb-react-ui-kit';
import dayjs from 'dayjs';
import notificationService from "../services/notificationService";

const BoardModeratorEdit = props => {
    const{id} = useParams();
    let navigate = useNavigate();

    const { user: currentUser } = useSelector((state) => state.auth);
    const [currentProduct, setCurrentProduct] = useState("");
    const[message, setMessage] = useState("");

    const getProduct = id => {
        productService.getOneNoPop(id)
          .then(response => {
            setCurrentProduct(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

    useEffect(() => {
    if (id)
    getProduct(id);
    }, [id]);

    const handleEnterFromRaddleApi =(id)=>{
      addtoraffleApi(id);
      addEnterNotification(id);
  
    }
  
    const addtoraffleApi = (id) => {
    var data = {
        _id: currentUser._id
    }
    productService.addtoraffle(id,data)
        .then(response => {
        console.log(response.data);
        window.location.reload();
        })
        .catch(e => {
        console.log(e);
        });
    };

    const addEnterNotification = (idproduct) => {
      var data = {
        _iduser: currentUser._id,
        _idproduct: idproduct,
      }
      notificationService.addEnter(data)
        .then(response => {
          console.log(response.data);
          window.location.reload();
        })
        .catch(e => {
          console.log(e);
        });
    };
    
  const handleRemoveFromRaddleApi =(id)=>{
    removefromraffleApi(id);
    addExitNotification(id);
  }

  const addExitNotification = (idproduct) => {
    var data = {
      content: "",
      _iduser: currentUser._id,
      _idproduct: idproduct,

    }
    notificationService.addExit(data)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };
  

    const removefromraffleApi = (id) => {
    var data = {
        _id: currentUser._id
    }
    productService.removefromraffle(id, data)
        .then(response => {
        console.log(response.data);
        window.location.reload();
        })
        .catch(e => {
        console.log(e);
        });
    };
    

  return (
    <div style={{marginTop:"50px"}}>
      {currentProduct ? (
        <div className="d-flex">
          
         
                <div className="p-2 flex-fill"><img src={currentProduct.imageFile} alt="zdjecie" height="300px" ></img></div>
                <div className="p-2 flex-fill">
                    <div className="p-2 flex-fill">
                        <h2>{currentProduct.title}</h2>
                    </div>
                    <div className="p-2 flex-fill">
                        <p>{currentProduct.description}</p>
                    </div>
                    <div className="p-2 flex-fill">
                        <p>{currentProduct.price} $</p>
                    </div>
                    <div className="p-2 flex-fill">
                    <p><b>{dayjs(currentProduct.raffleTime).locale('pl').format('LLLL')}</b></p>
                    </div>
                    <div className="p-2 flex-fill">
                        {/* <b>product id:</b>{currentProduct._id}
                        <br/>
                        <b>user id:</b>{currentUser._id}
                        <b>{currentProduct.usersInRaffle._id}</b> */}
                        {/* <b>{console.log(currentProduct.usersInRaffle.includes(currentUser._id))}</b> */}
                    </div>

                    

                    <div className="p-2 flex-fill">
                        {currentProduct.usersInRaffle.includes(currentUser._id) ? (
                                <MDBBtn color='warning' onClick={() => handleRemoveFromRaddleApi(currentProduct._id)}>Exit the raffle </MDBBtn>
                                ):(<MDBBtn color='dark' onClick={() => handleEnterFromRaddleApi(currentProduct._id)}>Enter the raffle</MDBBtn>)
                        }   
                    </div>

                </div>
                {/* <div className="p-2 flex-fill">{currentProduct.description}</div> */}
        </div>
      ) : (
        <div>
          <br />
          <p>there is no product with this id.</p>
        </div>
      )}
    </div>
    
  )

    };

export default BoardModeratorEdit