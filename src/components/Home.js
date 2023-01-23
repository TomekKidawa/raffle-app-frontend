import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import productService from "../services/productService";
import notificationService from "../services/notificationService";
import UserService from "../services/user.service";
import Box from '@mui/material/Box';

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
} from 'mdb-react-ui-kit';
import Pagination from '@mui/material/Pagination';
import dayjs from 'dayjs';


const Home = () => {
  const [content, setContent] = useState("");
  const [products, setProducts] =useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  //for pagination
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const pageSizes = [6, 9, 12];

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  
  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retriveProducts = () => {
    const params = getRequestParams(searchTitle, page, pageSize);

    productService.getAllPublic(params)
      .then(response => {
        const {products, totalPages } = response.data;
        setProducts(products);
        setCount(totalPages);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
// for pagination

  useEffect(() => {
    retriveProducts();

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
  }, [page, pageSize]);


  // pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  // pagination


  // API ADD/REMOVE RAFFLE
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

  return (
    <div className="container">

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retriveProducts}
            >
              Search
            </button>
          </div>
        </div>
        
      <div style={{marginTop:"-50px"}}>
        {currentUser ?  (
        
        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
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
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
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
    <div style={{marginTop:"70px"}}>
      <div className="mt-3">
            {"Items per Page: "}
            <select onChange={handlePageSizeChange} value={pageSize}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          
          <Pagination
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              shape="rounded"
              onChange={handlePageChange}
            />
        </Box>
        
      </div >
  
    </div>
    
  );
};

export default Home;