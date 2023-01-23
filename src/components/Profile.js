import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import UserMenagmentService from "../services/usersMenagmentService";
import notificationService from "../services/notificationService";

const Profile = () => {

  const{id} = useParams();

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

  const { user: currentProfile } = useSelector((state) => state.auth);
  const[currentUser, setCurrentUser] = useState(initialUserState);
  const[currentUserNotification, setCurrentUserNotification] = useState("");

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

  // const getNotification = () => {
  //   var data = {
  //     _id: currentUser._id
  //   }
  //   notificationService.getAlltoSpecUser(data)
  //     .then(response => {
  //       setCurrentUserNotification(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };


  useEffect(() => {
    if (id)
      getUser(id);
  }, [id]);


  if (!currentProfile) {
      return <Navigate to="/login" />;
    }


  return (
    <div className="container">
     
        <h3>
          <strong>{currentProfile.username}</strong> Profile
        </h3>
     
      <p>
        <strong>Token:</strong> {currentProfile.accessToken.substring(0, 20)} ...{" "}
        {currentProfile.accessToken.substr(currentProfile.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentProfile._id}
      </p>
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
      <strong>Authorities:</strong>
      <ul>
        {currentProfile.roles &&
          currentProfile.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
   
      <Link
        to={"../profile/settings/" + currentProfile._id}
      >
        <MDBBtn className='mx-2' size='sm'>Settings</MDBBtn>
        
      </Link>

          <br/>
          <br/>

          {/* WZIETE JUZ DO OSOBNYCH KOMPONENTOW */}

          {/* <p>Takin' part in raffle:</p>
      <ul>
        {currentUser.participatesInRaffles &&
          currentUser.participatesInRaffles.map((product, index) => <li key={index}><b>title: </b>{product.title} <b>description: </b>{product.description}</li>)}
      </ul> */}


      {/* <p>Won Lottery:</p>
      <ul>
        {currentUser.ProductWonRaffle &&
          currentUser.ProductWonRaffle.map((product, index) => <li key={index}><b>title: </b>{product.title} <b>description: </b>{product.description}</li>)}
      </ul> */}
      

            {/* TEST NOTIFICATION */}

            {/* <MDBBtn className='mx-2' size='sm' onClick={getNotification}>notification</MDBBtn>
            <MDBBtn className='mx-2' size='sm' onClick={()=>setCurrentUserNotification("")}>hide notification</MDBBtn>

          {currentUserNotification ?
              (<ul>
              {currentUserNotification &&
                currentUserNotification.map((a, index) => <li key={index}><b>content </b>{a.content}</li>)}
            </ul>)
          
          :(<></>)
          } */}

     
    </div>
  );
};

export default Profile;