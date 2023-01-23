import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

// for table
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
//for table


// import EventBus from "../common/EventBus";

const BoardModeratorProducts = () => {

  const [products, setProducts] =useState("")
  // const [content, setContent] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(9);

  const pageSizes = [6, 9, 12];

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  // useEffect(() => {
  //   retriveProducts();

    // UserService.getModeratorBoard().then(
    //   (response) => {
    //     setContent(response.data);
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setContent(_content);

    //     if (error.response && error.response.status === 401) {
    //       EventBus.dispatch("logout");
    //     }
    //   }
    // );
  // }, []);

  


  
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

    productService.getAll(params)
      .then((response) => {
        const {products, totalPages } = response.data;
        setProducts(products);
        setCount(totalPages);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

useEffect(retriveProducts, [page, pageSize]);


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };


  const chooseTheWinner = (id) => {
    productService.drawTheWinner(id)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retriveAllPurshased = () => {
    productService.findPurshased()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retriveAllPublic = () => {
    productService.findPublic()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retriveAllNonPublic = () => {
    productService.getAllNonPublic()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const retriveAllIsWinner = () => {
    productService.findIsWinner()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  
  const siema = () =>{
      console.log("sieeema")
  }

  


  return (
    <div className="container">
        {/* <h3>{content}</h3> */}

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

        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 0,
          m: 0,
          bgcolor: 'background.paper',
          borderRadius: 0,
        }}
      >
        <div className="mt-3">
          {"Items per Page: "}
          <select style={{marginBottom:"10px"}} onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
      
        
      </Box>

        <h6>Filter by:</h6>
        <div style={{marginBottom:"15px"}}>
          <MDBBtn style={{marginRight:"15px"}} size='sm' color='light' rippleColor='dark' onClick={retriveProducts}>All</MDBBtn> 
          <MDBBtn style={{marginRight:"15px"}} size='sm' color='light' rippleColor='dark' onClick={retriveAllPublic}>Only Public</MDBBtn>
          <MDBBtn style={{marginRight:"15px"}} size='sm' color='light' rippleColor='dark' onClick={retriveAllNonPublic}>Only non Public</MDBBtn>
          <MDBBtn style={{marginRight:"15px"}} size='sm' color='light' rippleColor='dark' onClick={retriveAllIsWinner}>Only isWinner</MDBBtn>
          <MDBBtn style={{marginRight:"15px"}} size='sm' color='light' rippleColor='dark' onClick={retriveAllPurshased}>All Purshased</MDBBtn>
        </div>
        
        
 
<MDBTable align='middle' style={{marginBottom:"50px"}}>
  
      <MDBTableHead light>
        <tr>
          <th scope='col'>img</th>
          <th scope='col'>title</th>
          {/* <th scope='col'>imgFile</th> */}
          <th scope='col'>creator</th>
          <th scope='col'>isPublic</th>
          <th scope='col'>isPurshased</th>
          <th scope='col'>isWinner</th>
          <th scope='col'>usersInRaffle</th>
          <th scope='col'>category</th>
          <th scope='col'>action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
          {products &&
              products.map((product, index) => (
                <tr
                  key={index}
                > 
                  {/* <th scope="row">i</th> */}
                      <td><img src={product.imageFile} alt="photo" height="25px"></img></td>
                      <td>{product.title}</td>
                      <td>{product.creator}</td> 
                      {/* <td><img src={product.imageFile} height="30px"></img></td> */}
                      <td>{product.isPublic === false ? "false" : "true"}</td>
                      <td>{product.isPurshased === false ? "false" : "true"}</td>
                      <td>{product.isWinner === false ? "false" : "true"}</td>
                      {/* <td>{product.relaseTime}</td> */}
                      <td>{product.usersInRaffle.length}</td>

                      {/* <td>{product.category.length}</td> */}
                      {product.category.map((c, index) => (
                          <td key={index}>{c.name}</td>
                          
                        ))}

                      <td>
                          <Link
                            to={"/product/" + product._id}>
                            <MDBBtn className='mx-2' color='warning' size='sm'>Edit</MDBBtn>
                          </Link>

                          <MDBBtn className='mx-2' color='danger' size='sm' onClick={() => chooseTheWinner(product._id)}>draw the winner</MDBBtn>
                      </td>
                </tr>
              ))}
      </MDBTableBody>
    </MDBTable>

        {/* {products} */}
    </div>
  );
};

export default BoardModeratorProducts;