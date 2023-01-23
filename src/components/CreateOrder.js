import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { useSelector } from "react-redux";
import orderService from '../services/orderService';
import paymentService from '../services/paymentService';
import StripeCheckout from 'react-stripe-checkout';

import { MDBBtn } from 'mdb-react-ui-kit';

import { validationSchema } from './validations/FormOrderSchema'
import { useFormik } from "formik";
   
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

const Order = () => {
 

    const{id} = useParams();
    let navigate = useNavigate();

    const { user: currentUser } = useSelector((state) => state.auth);
    const [currentProduct, setCurrentProduct] = useState("");
    //const [currentProf, setCurrentProf] = useState("");
    const [curretOrder, setCurrentOrder] = useState(initialOrderState);
    // const[message, setMessage] = useState("");

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


    const formik = useFormik({
      enableReinitialize:true,
      initialValues: curretOrder,
      validationSchema,
      onSubmit : (data) => {
       console.log(data)
      }
    });

    // const handleInputChange = event => {
    //   const { name, value } = event.target;
    //   setCurrentOrder({ ...curretOrder, [name]: value });
    // };


    function rewriteHandle(){
      setCurrentOrder(
        {...setCurrentOrder, email: currentUser.email,
          address: currentUser.address, 
          city: currentUser.city,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          city: currentUser.city,
          postalCode: currentUser.postalCode,
          phone: currentUser.phone
        })
    }


    const saveOrder = ()=> {
      // e.preventDefault();
      var data = {
        email:formik.values.email,
        address:formik.values.address,
        city: formik.values.city,
        postalCode: formik.values.postalCode,
        phone: formik.values.phone,
        isPaid: true,
        isShipped: false,
        User:[currentUser._id],
        Product:[currentProduct._id]
      };

      // var data = {
      //   email:curretOrder.email,
      //   address:curretOrder.address,
      //   city: curretOrder.city,
      //   postalCode: curretOrder.postalCode,
      //   phone: curretOrder.phone,
      //   isPaid: true,
      //   isShipped: false,
      //   User:[currentUser._id],
      //   Product:[currentProduct._id]
      // };
  
      orderService.createOrder(data)
      .then(response => {
        setCurrentProduct({
          id: response.data.id,
          email: response.data.email,
          address: response.data.address,
          city: response.data.city,
          postalCode: response.data.postalCode,
          phone: response.data.phone,
          isPaid: response.data.isPaid,
          isShipped: response.data.isShipped,
          User: [currentUser._id],
          Product: [currentProduct._id]
        });
        navigate(`/profile/myorders/${currentUser._id}`)
        // setSubmitted(true);
        // setTemporaryMessage("pomyślnie dodano nowy order");
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  ///payments 
  const payNow = async token =>{
    var data={
      amount: currentProduct.price * 100,
      token
    }
    paymentService.createPayment(data)
    .then(response => {
      // if(response.status == 200){
      //     console.log('Your payment was sucessfull')
      // }
      
      console.log(response + "Your payment was sucessfull");
      saveOrder()
    })
    .catch(e => {
      console.log(e);
    });
  }

  //payments


  return (
    <div>

      <h2>ORDER</h2>
      
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
                        <p><b>{currentProduct.price}</b> $</p>
                    </div>
                    {/* <div className="p-2 flex-fill">
                        <b>product id:</b>{currentProduct._id}
                        <br/>
                        <b>user id:</b>{currentUser._id}
                    </div> */}
                </div>
                {/* <div className="p-2 flex-fill">{currentProduct.description}</div> */}
        </div>
        <h4>Order Data:</h4>

        <form onSubmit = {formik.handleSubmit} style={{marginBottom:"40px"}}>
          <div class="d-flex justify-content-between">

           
                <div className="p-2 flex">  
                
              
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email" 
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className={
                        'form-control' +
                        (formik.errors.email && formik.touched.email
                          ? ' is-invalid'
                          : '')
                        }
                      />
                      <div className="text-danger" style={{marginTop:"-15px"}}>
                      <small>{formik.errors.email && formik.touched.email
                          ? formik.errors.email
                          : null}</small> 
                      </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstName">First name:</label>
                    <input
                      
                      type="text" 
                      id="firstName"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      className={
                        'form-control' +
                        (formik.errors.firstName && formik.touched.firstName
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <div className="text-danger" style={{marginTop:"-15px"}}>
                    <small>{formik.errors.firstName && formik.touched.firstName
                        ? formik.errors.firstName
                        : null}</small> 
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last name:</label>
                    <input
                      type="text" 
                      id="lastName"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      className={
                        'form-control' +
                        (formik.errors.lastName && formik.touched.lastName
                          ? ' is-invalid'
                          : '')
                        }
                      />
                      <div className="text-danger" style={{marginTop:"-15px"}}>
                      <small>{formik.errors.lastName && formik.touched.lastName
                          ? formik.errors.lastName
                          : null}</small> 
                      </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text" 
                      id="address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      className={
                        'form-control' +
                        (formik.errors.address && formik.touched.address
                          ? ' is-invalid'
                          : '')
                        }
                      />
                      <div className="text-danger" style={{marginTop:"-15px"}}>
                      <small>{formik.errors.address && formik.touched.address
                          ? formik.errors.address
                          : null}</small> 
                      </div>
                  </div>
              
                
            
                </div>
                <div className="p-2 flex"> 
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                      type="text" 
                      id="city"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      className={
                        'form-control' +
                        (formik.errors.city && formik.touched.city
                          ? ' is-invalid'
                          : '')
                        }
                      />
                      <div className="text-danger" style={{marginTop:"-15px"}}>
                      <small>{formik.errors.city && formik.touched.city
                          ? formik.errors.city
                          : null}</small> 
                      </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Postal Code:</label>
                    <input
                      type="text" 
                      id="postalCode"
                      name="postalCode"
                      value={formik.values.postalCode}
                      onChange={formik.handleChange}
                      className={
                        'form-control' +
                        (formik.errors.postalCode && formik.touched.postalCode
                          ? ' is-invalid'
                          : '')
                        }
                      />
                      <div className="text-danger" style={{marginTop:"-15px"}}>
                      <small>{formik.errors.postalCode && formik.touched.postalCode
                          ? formik.errors.postalCode
                          : null}</small> 
                      </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone number:</label>
                    <input
                      type="text" 
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      className={
                        'form-control' +
                        (formik.errors.phone && formik.touched.phone
                          ? ' is-invalid'
                          : '')
                        }
                      />
                      <div className="text-danger" style={{marginTop:"-15px"}}>
                      <small>{formik.errors.phone && formik.touched.phone
                          ? formik.errors.phone
                          : null}</small> 
                      </div>
                  </div>
                </div>


                <div className="p-2 flex">  

                  <h4>User Data:</h4>
                  
                <p>
                  <strong>Email:</strong> {currentUser.email}
                </p>
                <p>
                  <strong>First name:</strong> {currentUser.firstName}
                </p>
                <p>
                  <strong>Last name:</strong> {currentUser.lastName}
                </p>
                <p>
                  <strong>Address:</strong> {currentUser.address}
                </p>
                <p>
                  <strong>City:</strong> {currentUser.city}
                </p>
                <p>
                  <strong>Postal Code:</strong> {currentUser.postalCode}
                </p>
                <p>
                  <strong>Phone:</strong> {currentUser.phone}
                </p>
                <MDBBtn 
                  type='button'
                  className='mx-2' 
                  color='success'
                  size='sm'
                  style={{padding:"4px 9px 4px 9px"}}
                  onClick={rewriteHandle}
                  >
                  Use my Data
              </MDBBtn>            

                </div>
                
          </div>
              {/* <MDBBtn 
                className='mx-2' 
                color='success'
                size='sm'
                style={{padding:"4px 9px 4px 9px"}}
                onClick={rewriteHandle}
                >
                Use my Data
            </MDBBtn>             */}

        
          <div style={{margin:"10px 10px 40px 8px"}}>
       
            
             <StripeCheckout
              type="submit"
              stripeKey='pk_test_51MMsU2JniTqI9rOQOanq0o2FN5hitRj9odb6FuEx6XVjHqn2MyEXxjQevl3BhM7MWBoqfnSzTOuF01VAR7P3sewy00bPAlNdJv'
              name="Pay With Credit Card"
              amount={currentProduct.price * 100}
              description={`You have to Pay $${currentProduct.price}`}
              token={payNow}
              /> 
         
         
          </div>
          </form>
      
    </div>
    
  )

    };

export default Order;