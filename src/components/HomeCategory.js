import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

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

import productService from "../services/productService";
import notificationService from "../services/notificationService";
import UserService from "../services/user.service";

const HomeCategory = () => {
  const{id} = useParams();
  const [content, setContent] = useState("");
  const [products, setProducts] =useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  // const [tableTemporary, SetTableTemporary] = useState([1,23,3]);
  // const [tempProduct, setTempProduct] = useState("");



  useEffect(() => {
    if(id){
        retriveProducts(id);
    }
        
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, [id]);

  const retriveProducts = (id) => {
    productService.getAllPublicByCategory(id)
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  //test API ADD/REMOVE


  const handleRemoveFromRaddleApi =(id)=>{
    removefromraffleApi(id);
    addExitNotification(id);

  }

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



 
  // API SEND NOTIFICATION AFTER ENTER/EXIT
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

  const addExitNotification = (idproduct) => {
    var data = {
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
/////



//test API ADD/REMOVE

function sayHello(name) {
  alert(`hello, ${name}`);
}

function test() {
  alert('hello');
}


  return (
    <div className="container">
        
        {/* <>{products && products.map((a, index) =>  
                <a key={index}>
                
                    <b>{a.category && a.category.map((b, index) =>  
                            <h4 key={index}>{b.name}</h4>)}
                    </b>
                    
                </a>)}
        </> */}

        {currentUser ?  (
        <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{marginBottom:"80px", marginTop:"-55px"}}>
              {products &&
                  products.map((product, index) => (
          
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
                            ):(<MDBBtn color='dark' onClick={() => handleEnterFromRaddleApi(product._id)}>Enter the raffle</MDBBtn>)}
                          </MDBCard>        
                      
                  </MDBCol>
              ))}

        </MDBRow>):(
                <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{marginBottom:"80px", marginTop:"-55px"}}>
                      {products &&
                          products.map((product, index) => (
                          <MDBCol  key={index}>
                                <MDBCard className='h-100'  >
                                  
                                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/login"}> 
                                    
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
                                      
                                          <MDBBtn color='dark'>
                                            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/login"}>
                                               Log in to take part in raffle
                                            </Link>
                                          </MDBBtn>
                                      
                                  </MDBCard>        
                          </MDBCol>
                      ))}

              </MDBRow>

      )}
   
    </div>
  );
};

export default HomeCategory;