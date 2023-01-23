import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBBtn,
  MDBCol,
} from 'mdb-react-ui-kit';
import UserMenagmentService from "../services/usersMenagmentService";
import productService from "../services/productService";
import notificationService from "../services/notificationService";
import dayjs from 'dayjs';

const ProfileCurrentRaffle = () => {

  const initialUserState ={
    _id:null,
  }

  const{id} = useParams();


  const { user: currentProfile } = useSelector((state) => state.auth);
  const[currentUser, setCurrentUser] = useState(initialUserState);
  const[currentProducts, setCurrentProducts] = useState("");

   const getUser = id => {
    UserMenagmentService.getOne(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getCurrentRaffles = id => {
    productService.findForCurrentRaffles(id)
      .then(response => {
        setCurrentProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };



  useEffect(() => {
    if (id)
      getUser(id);
      getCurrentRaffles(id)
  }, [id]);


  function test() {
    alert('hello');
  }


  const handleRemoveFromRaddleApi =(id)=>{
    removefromraffleApi(id);
    addExitNotification(id);
  }

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




  if (!currentProfile) {
      return <Navigate to="/login" />;
    }


  return (
    <div className="container">
      
        
          <h4>currently takin' part in raffle:</h4>
      {/* <ul>
        {currentUser.participatesInRaffles &&
          currentUser.participatesInRaffles.map((product, index) => <li key={index}><b>title: </b>{product.title} <b>description: </b>{product.description}</li>)}
      </ul>
       */}

      {/* <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
              {currentUser.participatesInRaffles &&
                  currentUser.participatesInRaffles.map((product, index) => (
          
                  <MDBCol  key={index}>

                   
                        <MDBCard className='h-100'  >
                          
                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"../product/card/" + product._id}> 
                            
                          <MDBCardImage
                            src={product.imageFile}
                            alt='...'
                            position='top'
                          /> </Link>
                          <MDBCardBody>
                            <MDBCardTitle component={Link} to={'/first'} >{product.title}</MDBCardTitle>
                            <MDBCardText>{product.description}</MDBCardText>
                            <div className="d-flex flex-row-reverse">
                                <div className="p-2"><MDBCardText> <small className='text-muted'>155$</small></MDBCardText></div>
                            </div>
                            
                          </MDBCardBody>
                      

                          {product.usersInRaffle.includes(currentUser._id) ? (
                              <MDBBtn color='warning' onClick={() => handleRemoveFromRaddleApi(product._id)}>Exit the raffle </MDBBtn>
                            ):(<MDBBtn color='dark' onClick={test}>Enter the raffle</MDBBtn>)}
                          </MDBCard>        
                      
                  </MDBCol>
                  ))}
        </MDBRow> */}

        <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{marginBottom:"80px", marginTop:"-55px"}}>
              {currentProducts &&
                  currentProducts.map((product, index) => (
          
                  <MDBCol  key={index}>

                   
                        <MDBCard className='h-100'  >
                          
                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"../product/card/" + product._id}> 
                            
                          <MDBCardImage
                            src={product.imageFile}
                            alt='...'
                            position='top'
                          /> </Link>
                          <MDBCardBody>
                            <MDBCardTitle component={Link} to={'/first'} >{product.title}</MDBCardTitle>
                            <MDBCardText>{product.description}</MDBCardText>
                            <div className="d-flex flex-row-reverse">
                                <div className="p-2"><MDBCardText> <small className='text-muted'>{product.price}$</small></MDBCardText></div>
                            </div>
                            <p><b>{dayjs(product.raffleTime).locale('pl').format('LLLL')}</b></p>
                            
                          </MDBCardBody>
                      

                          {product.usersInRaffle.includes(currentUser._id) ? (
                              <MDBBtn color='warning' onClick={() => handleRemoveFromRaddleApi(product._id)}>Exit the raffle </MDBBtn>
                            ):(<MDBBtn color='dark' onClick={test}>Enter the raffle</MDBBtn>)}
                          </MDBCard>        
                      
                  </MDBCol>
                  ))}
        </MDBRow>

    </div>
  );
};

export default ProfileCurrentRaffle;