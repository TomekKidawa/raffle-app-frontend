import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

import {MDBBtn} from "mdb-react-ui-kit"
import FileBase from 'react-file-base64';

//time picker mui
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { validationSchema } from './validations/FormsValidation'
import { useFormik } from "formik";

const initialProductState ={
  _id:null,
  title:"",
  description:"",
  imageFile:"",
  creator:"",
  price:"",
  isPublic:"",
  isPurshased:``,
  usersInRaffle:[],
  category:[],
  raffleTime:``,
}

const BoardModeratorEdit = () => {
    const{id} = useParams();
    let navigate = useNavigate();

    const [currentProduct, setCurrentProduct] = useState(initialProductState);
    const [category, setCategory] = useState("");

    const[message, setMessage] = useState("");
    //
    // const formik = useFormik({
    //   initialValues: currentProduct,
    //   validationSchema,
    //   // validateOnChange: false,
    //   // validateOnBlur: false,
    //   onSubmit : (data) => {
    //       console.log(JSON.stringify(data, null, 2));
    //       setCurrentProduct(...currentProduct, data);
    //       updateProduct()
    //     },
    // });
    //


    const getProduct = id => {
        productService.getOne(id)
          .then(response => {
            setCurrentProduct(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

        const formik = useFormik({
            enableReinitialize:true,
            initialValues: currentProduct,
            validationSchema,
            onSubmit : (values) => {
                productService.editProduct(currentProduct._id, values)
                    .then(response => {
                    console.log(response.data);
                    setMessage("The Product was updated successfully!");
                })
                    .catch(e => {
                    console.log(e);
                });
                },
        });

      const getCategory= () => {
        categoryService.findAll()
          .then(response => {
            setCategory(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

      useEffect(() => {
        getCategory();
        if (id)
          getProduct(id);
      }, [id]);
    
      const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
      };

      function test(){
        window.print("siemaaaaaaaaaaaa");
      };

    // const updateProduct = () => {
    //     productService.editProduct(currentProduct._id, currentProduct)
    //     .then(response => {
    //       console.log(response.data);
    //       setMessage("The Product was updated successfully!");
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // }; 
    
    const unPublish =()=>{
      setCurrentProduct({ ...currentProduct, isPublic: false }) 
    }

    const deleteProduct = () => {
        productService.deleteProduct(currentProduct._id)
        .then(response => {
          console.log(response.data);
          navigate("/Product");
        })
        .catch(e => {
          console.log(e);
        });
    };

    const publish = (id) =>{
      productService.setPublic(id)
      .then(response => {
        console.log(response.data);
        setMessage("The Product is public now!!!");
      })
      .catch(e => {
        console.log(e);
      });
    }

    // const resetTheWinner = () => {
    //   var data = {
    //     // _idUser: currentUser._id,
    //     _idProduct: currentProduct._id,
    //   }
    //   productService.resetWinner(data)
    //     .then(response => {
    //       console.log(response.data);
    //       window.location.reload();
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // };
  
    function handleSelectChange(e) {
      console.log("category Selected!!");
      setCurrentProduct({ ...currentProduct, category:[e.target.value]});
    }


  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Product</h4>

          <p><b>product id:</b> {currentProduct._id}</p>
          <p><b>created by:</b> {currentProduct.creator}</p>

        
        <form onSubmit = {formik.handleSubmit} style={{marginBottom:"40px"}}>

          <img src={currentProduct.imageFile} alt="smth" width="300px"></img>
            <div className="d-flex justify-content-start">
              <FileBase type="file" multiple={false} onDone={(({base64}) => 
                setCurrentProduct({...currentProduct, imageFile:base64}))}/>
            </div>

          
            <div className="form-group" >
                <label>title:</label>
              <input 
                placeholder='title'
                type="text"
                name='title'
                value={formik.values.title}
                onChange={formik.handleChange}
                className={
                    'form-control' +
                    (formik.errors.title && formik.touched.title
                      ? ' is-invalid'
                      : '')
                  }
                />
                <div className="text-danger" style={{marginTop:"-15px"}}>
                <small>{formik.errors.title && formik.touched.title
                    ? formik.errors.title
                    : null}</small> 
                </div>
            </div>
            <div className="row">

            <div className="form-group">
                    
                <label >description:</label>
                <textarea 
                    style={{height: "120px"}}
                    placeholder='description'
                    type="text"
                    id="description"
                    name='description'
                    
                    className={
                        'form-control' +
                        (formik.errors.description && formik.touched.description
                        ? ' is-invalid'
                        : '')
                    }
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    />
                    <div className="text-danger" style={{marginTop:"-15px"}}>
                    <small>{formik.errors.description && formik.touched.description
                        ? formik.errors.description
                        : null}</small> 
                    </div>
            </div>
            </div>
              <div className="row">
                <div className="col">
                    <label htmlFor="title">price:</label>
                    <div className="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                      </div>
                      <input 
                        placeholder='00.00'
                        type="text"
                        id="price"
                        name='price'
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        className={
                            'form-control' +
                            (formik.errors.price && formik.touched.price
                              ? ' is-invalid'
                              : '')
                          }
                      />
                    
                    </div>
                    <div className="text-danger" >
                        <small>{formik.errors.price && formik.touched.price
                            ? formik.errors.price
                            : null}</small> 
                        </div>
                </div>
              <div className='col'>

                  <div className="form-group">
                    <label htmlFor="category">category select:</label>

                    <select class="custom-select" id="category" name="category" value={currentProduct.category} onChange={handleSelectChange}>
                          {/* currently selected */}
                      {currentProduct.category && currentProduct.category.map((category, index) =>  
                      <option key={index} value={""} defaultValue>{category.name}</option>)}
                        
                        {category && category.map((category, index) => 
                            <option key={index} name="category" value={category._id}>{category.name}</option>
                        )}
                    </select>
                  </div>
              </div>
             
            </div>

            <div className="form-group">
                <label htmlFor="category">select raffle time:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Select Date"
                    type="date"
                    id="raffleTime"
                    name='raffleTime'
                    value={currentProduct.raffleTime}
                    onChange={value => handleInputChange({ target: { value: value, name: 'raffleTime' } })}
                  />
                </LocalizationProvider>
            </div>
            
            <p>Raffle Time: {dayjs(currentProduct.raffleTime).locale('pl').format('LLLL')}</p>

            <div className='row'>
              <div className='col'>
                <p><b>is Public:</b> {currentProduct.isPublic === false ? "false" : "true"}</p>
              </div>
              <div className='col'>
                  <p><b>is Winner:</b> {currentProduct.isWinner === false ? "false" : "true"}</p>
              </div>
              <div className='col'>
                  <p><b>is Purshased:</b> {currentProduct.isPurshased === false ? "false" : "true"}</p>
              </div>

            </div>
            <div style={{marginTop:15}}>
                <MDBBtn 
                  type='button'
                  style={{marginLeft:0}}
                  className='mx-2' 
                  color='danger' 
                  onClick={deleteProduct}
                  >
                  Delete
              </MDBBtn>
              <MDBBtn 
                  type='button'
                  className='mx-2' 
                  color='warning' 
                  onClick={unPublish}
                  >
                  Unpublish
              </MDBBtn>
              <MDBBtn
                  type='button'
                  className='mx-2' 
                  color='success'
                  onClick={()=>publish(id)}
                  >
                  publish
              </MDBBtn>
              <button style={{marginLeft:8}} type="submit" className="btn btn-primary" >submit</button>
                <button
                  type="button"
                  className="btn btn-warning float-right"
                  onClick={formik.handleReset}
                  >
                  Reset
              </button>
            </div>
          </form>
          
         
           
            {/* <MDBBtn 
                className='mx-2' 
                onClick={resetTheWinner}
                >
                reset Winner nie dziala do naprawy
            </MDBBtn> */}
      
          {/* <p>users in raffle:</p>
          <ul>
            {currentProduct.usersInRaffle.map((user, index) => <li key={index}>{user.username}</li>)}
          </ul>
             */}
          {/* <p>{currentProduct.usersInRaffle.username}</p> */}

      
          {/* <MDBBtn className='mx-2'
              type="submit"
              onClick={updateProduct}
              >
              Update
          </MDBBtn> */}

     

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
    
  )

    };

export default BoardModeratorEdit

