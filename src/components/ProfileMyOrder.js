import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MDBRow,
} from 'mdb-react-ui-kit';
import orderService from "../services/orderService";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


const ProfileMyOrder = () => {

  const{id} = useParams();

  const { user: currentProfile } = useSelector((state) => state.auth);
  const[currentOrders, setCurrentOrders] = useState("");


  const getOrders = (id) => {
    orderService.getOrdersSpecUser(id)
      .then(response => {
        setCurrentOrders(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  useEffect(() => {
    if (id)
    getOrders(id);
  }, [id]);


  if (!currentProfile) {
      return <Navigate to="/login" />;
    }


  return (
    <div className="container">
          <h4>My Orders:</h4>
      {/* <ul>
        {currentOrders &&
          currentOrders.map((order, index) => <li key={index}><b>id:</b>{order._id}</li>)}
      </ul> */}
    

      <MDBTable align='middle'>
  
  <MDBTableHead light>
    <tr>
      <th scope='col'>img</th>
      <th scope='col'>Product:</th>
      {/* <th scope='col'>User:</th> */}
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
      {currentOrders &&
          currentOrders.map((order, index) => (
            <tr
              key={index}
            > 
                {order.Product.map((o, index) => (
                    <td key={index}><img src={o.imageFile} alt="photo" height="25px"></img></td>
                    
                  ))}
                {order.Product.map((o, index) => (
                    <td key={index}>{o.title}</td>
                
                  ))}
                

                
                  <td>{order.email}</td>
                  <td>{order.address}</td> 
                  <td>{order.city}</td> 
                  <td>{order.postalCode}</td> 
                  <td>{order.phone}</td> 
                  {/* <td><img src={product.imageFile} height="30px"></img></td> */}
                  <td>{order.isPaid === false ? "false" : "true"}</td>
                  <td>{order.isShipped === false ? "false" : "true"}</td>
{/*                   
                  <td>
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

export default ProfileMyOrder;