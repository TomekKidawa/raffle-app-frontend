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
  MDBCardFooter,
  MDBBtn,
  MDBCol,
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import UserMenagmentService from "../services/usersMenagmentService";
import productService from "../services/productService";
import notificationService from "../services/notificationService";

const ProfileWonRaffle = () => {

  const initialUserState ={
    _id:null,
  }

  const{id} = useParams();


  const { user: currentProfile } = useSelector((state) => state.auth);
  const[currentUser, setCurrentUser] = useState(initialUserState);

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

  useEffect(() => {
    if (id)
      getUser(id);
  }, [id]);


  function test() {
    alert('hello');
  }


  if (!currentProfile) {
      return <Navigate to="/login" />;
    }


  return (
    <div className="container">
      
        
          <h4>Won raffle:</h4>
      {/* <ul>
        {currentUser.ProductWonRaffle &&
          currentUser.ProductWonRaffle.map((product, index) => <li key={index}><b>title: </b>{product.title} <b>description: </b>{product.description}</li>)}
      </ul> */}
      

      <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{marginBottom:"80px", marginTop:"-55px"}}>
              {currentUser.ProductWonRaffle &&
                  currentUser.ProductWonRaffle.map((product, index) => (
          
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
                      
                          {product.isPurshased == false ? (
                             <MDBBtn color='warning'> <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"../order/product/" + product._id}>Buy Product</Link></MDBBtn>
                            ):(<MDBBtn color='dark' disabled>Yoo Already bought it!</MDBBtn>)}
                          </MDBCard>        
                      
                  </MDBCol>
                  ))}
        </MDBRow>

    </div>
  );
};

export default ProfileWonRaffle;