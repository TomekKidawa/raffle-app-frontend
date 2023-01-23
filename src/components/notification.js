import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import notificationService from "../services/notificationService";

const Notification = () => {
  const { user: currentProfile } = useSelector((state) => state.auth);
  
  const[currentUserNotification, setCurrentUserNotification] = useState("");

  const getNotification = () => {
    var data = {
      _id: currentProfile._id
    }
    notificationService.getAlltoSpecUser(data)
      .then(response => {
        setCurrentUserNotification(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  if (!currentProfile) {
      return <Navigate to="/login" />;
    }


  return (
    <div className="container">
           

            {/* TEST NOTIFICATION */}
            <MDBBtn className='mx-2' size='sm' onClick={getNotification}>notification</MDBBtn>
            <MDBBtn className='mx-2' size='sm' onClick={()=>setCurrentUserNotification("")}>hide notification</MDBBtn>

          {currentUserNotification ?
              (<ul>
              {currentUserNotification &&
                currentUserNotification.map((a, index) => <li key={index}><b>content </b>{a.content}</li>)}
            </ul>)
          
          :(<></>)
          }

    </div>
  );
};

export default Notification;