import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// for table
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import orderService from "../services/orderService";
//for table
// import EventBus from "../common/EventBus";

const BoardModOrders = () => {

  const [orders, setOrders] =useState("")

  useEffect(() => {
    retriveProducts();

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
  }, []);

  const retriveProducts = () => {
    orderService.findAll()
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
    });
  };

  const updateOrder = (id) => {
    var data ={
      isShipped : true
    }
    orderService.editOne(id, data)
    .then(response => {
      console.log(response.data);
      retriveProducts();
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <div className="container">
        {/* <h3>{content}</h3> */}

      <MDBTable align='middle'>
    
        <MDBTableHead light>
          <tr>
            <th scope='col'>img</th>
            <th scope='col'>Product:</th>
            <th scope='col'>User:</th>
            <th scope='col'>email</th>
            <th scope='col'>address</th>
            <th scope='col'>city</th>
            <th scope='col'>postalCode</th>
            <th scope='col'>phone</th>
            <th scope='col'>isPaid</th>
            <th scope='col'>isShipped</th>
            {/* <th scope='col'>actions:</th> */}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
            {orders &&
                orders.map((order, index) => (
                  <tr
                    key={index}
                  > 
                      {order.Product.map((o, index) => (
                          <td key={index}><img src={o.imageFile} alt="photo" height="25px"></img></td>
                          
                        ))}
                      {order.Product.map((o, index) => (
                          <td key={index}>{o._id}</td>
                      
                        ))}
                      

                      {order.User.map((o, index) => (
                          <td key={index}>{o.username}</td>
                        ))}
                        <td>{order.email}</td>
                        <td>{order.address}</td> 
                        <td>{order.city}</td> 
                        <td>{order.postalCode}</td> 
                        <td>{order.phone}</td> 
                        {/* <td><img src={product.imageFile} height="30px"></img></td> */}
                        <td>{order.isPaid === false ? "false" : "true"}</td>
                        <td> <MDBBtn onClick={()=>updateOrder(order._id)} className='mx-2' color='warning' size='sm'>{order.isShipped === false ? "false" : "true"}</MDBBtn></td>
                        
                        {/* <td>
                              <Link
                              to={"/order/" + order._id}>
                              <MDBBtn className='mx-2' color='warning' size='sm'>more</MDBBtn>
                            </Link>  
                        </td> */}
                      
                  </tr>
                ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default BoardModOrders;