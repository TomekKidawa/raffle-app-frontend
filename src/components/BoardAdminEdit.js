import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserMenagmentService from '../services/usersMenagmentService';
import { MDBBtn} from "mdb-react-ui-kit"
import { validationSchema } from './validations/FormUserSchema'
import { useFormik } from "formik";

const initialUserState ={
    _id:null,
    username:"",
    roles:[],
    adres:"",
    firstName:"",
    lastName:"",
    address:"",
    city:"",
    postalCode:"",
    phone:"",
}

const BoardAdminEdit = props => {
    const{id} = useParams();
    let navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(initialUserState);
    const[message, setMessage] = useState("");

    //test
    // const[temporaryRoles, setTemporaryRoles] = useState("");

  const formik = useFormik({
      enableReinitialize:true,
      initialValues: currentUser,
      validationSchema,
      onSubmit : (data) => {
       console.log(data)
       UserMenagmentService.editUser(currentUser._id, data)
       .then(response => {
         console.log(response.data);
         setMessage("The User was updated successfully!");
       })
       .catch(e => {
         console.log(e);
       });
      }
    });

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
    
      const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
      };

    const updateUser = () => {
      UserMenagmentService.editUser(currentUser._id, currentUser)
        .then(response => {
          console.log(response.data);
          setMessage("The User was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };

    const deleteUser = () => {
      UserMenagmentService.deleteUser(currentUser._id)
        .then(response => {
          console.log(response.data);
          navigate("/admin");
        })
        .catch(e => {
          console.log(e);
        });
    };


  function RoleUser(){
    setCurrentUser({ ...currentUser, roles: ["636a489c17f856e185305cac"] });
  }

  function RoleMod(){
    setCurrentUser({ ...currentUser, roles: ["636a489c17f856e185305cac","636a489c17f856e185305cad"] });
  }
  
  function RoleAdmin(){
    setCurrentUser({ ...currentUser, roles: [
      "636a489c17f856e185305cae",
      "636a489c17f856e185305cac",
      "636a489c17f856e185305cad"
    ]});
  }


  return (
    <div >
             <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User details:</h4>

         <a>user id: <b>{currentUser.username}</b></a> 

          <form onSubmit = {formik.handleSubmit} style={{marginBottom:"40px"}}>
            <div className='row'>
              <div className='col'>

                <div className="form-group" >
                  <label>first name:</label>
                <input 
                  placeholder='firstName'
                  type="text"
                  name='firstName'
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

              </div>
              <div className='col'>
              
                <div className="form-group" >
                    <label>last name:</label>
                  <input 
                    placeholder='lastName'
                    type="text"
                    name='lastName'
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
            </div>
            </div>

            <div className='row'>
              <div className='col'>
                <div className="form-group" >
                    <label>email:</label>
                  <input 
                    placeholder='email'
                    type="text"
                    name='email'
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
              </div>
              <div className='col'> 
                <div className="form-group">
                  <label htmlFor="description">phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder='000000000'
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
            </div>

            <div className='row'>
              <div className='col'>
                <div className="form-group">
                    <label>address:</label>
                    <input
                      type="text"
                      id="address"
                      placeholder='address'
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

              <div className='col'>
                <div className="form-group">
                  <label htmlFor="description">city:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder='city'
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
              </div>
              
              <div className='col'>
                <div className="form-group">
                  <label >postal code:</label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="00-000"
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
              </div>
            </div>
            <div style={{marginTop:10}}>
              <strong>Roles:</strong>
              {/* <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul> */}
                <ul>
                {currentUser.roles.includes("636a489c17f856e185305cac") ? (
                <li>user</li>
                ) : (
                <></>
                )}
                  {currentUser.roles.includes("636a489c17f856e185305cad") ? (
                <li>mod</li>
                ) : (<></>
                )}
                  {currentUser.roles.includes("636a489c17f856e185305cae") ? (
                <li>admin</li>
                ) : (
                  <></>
                )}

                        </ul>

              {/* ROLES BTNs */}
              <MDBBtn
                type="button"
                style={{marginRight:"15px"}}
                size='sm' color='light' rippleColor='dark'
                onClick={RoleUser}
              >
                User
              </MDBBtn>
              <MDBBtn
                type="button"
                style={{marginRight:"15px"}}
                size='sm' color='light' rippleColor='dark'
                onClick={RoleMod}
              >
                Mod
              </MDBBtn>
              <MDBBtn
                type="button"
                style={{marginRight:"15px"}}
                size='sm' color='light' rippleColor='dark'
                onClick={RoleAdmin}
              >
                Admin
              </MDBBtn>
            </div>

            <div style={{marginTop:20}}>
              <MDBBtn 
                          type='button'
                          className="mx-2"
                          color='danger'
                          onClick={deleteUser}>
                          Delete
                        </MDBBtn>
                        <button  type="submit" className="btn btn-primary">submit</button>
            </div>
            

          </form>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
    </div>
  )

  };

export default BoardAdminEdit