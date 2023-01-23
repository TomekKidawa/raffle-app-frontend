import React, { useState, useEffect } from "react";
import UserMenagmentService from "../services/usersMenagmentService";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit"

const Home = () => {

  const[users, setUsers] = useState([]);
  const[currentUser, setCurrentUser] = useState(null);
  const[currentIndex, setCurrentIndex] =useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const [content, setContent] = useState("");


  useEffect(() => {
    retrieveUsers();


    // UserService.getPublicContent().then(
    //   (response) => {
    //     setContent(response.data);
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();

    //     setContent(_content);
    //   }
    // );
  }, []);

  const onChangeSearchUser = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  ///test
  function siema(){
    console.log("siema")
  }

  const retrieveUsers = () => {
    UserMenagmentService.getAll()
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const refreshList = () => {
  //   retrieveUsers();
  //   setCurrentUser(null);
  //   setCurrentIndex(-1);
  // };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  // const findByUsername = () => {
  //   UserMenagmentService.findByUsername(searchTitle)
  //     .then(response => {
  //       setUserss(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };


  return (
    <div className="container">
      
      <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by username"
            value={searchTitle}
            onChange={onChangeSearchUser}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={siema}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Users List</h4>

        <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveUser(user, index)}
                  key={index}
                >
                {user.username}&nbsp;&nbsp;&nbsp;&nbsp;
                {user.email}  
                </li>
              ))}
          </ul>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User details:</h4>
              <p><b>Username:</b> {currentUser.username}</p>
              <p><b>Email:</b> {currentUser.email}</p>
              <p><b>First name:</b> {currentUser.firstName}</p>
              <p><b>Last name:</b> {currentUser.lastName}</p>          
              <p><b>Address:</b> {currentUser.address}</p>
              <p><b>City:</b> {currentUser.city}</p>
              <p><b>Postal Code:</b> {currentUser.postalCode}</p>
              <p><b>Phone:</b> {currentUser.phone}</p> 
            
            {/* <div>
                <strong>participate:</strong> {currentUser.participatesInRaffles[0]}
            </div> */}


            <Link
              to={"/edituser/" + currentUser._id}
            >
              <MDBBtn style={{marginTop:"15px"}} className='mx-2' color='warning' size='sm'>Edit User</MDBBtn>
              
            </Link>

          </div>
        ) : (
          <div>
            <br />
            <p>Please click on User...</p>
          </div>
        )}
      </div>
    </div>
      
        {/* <h3>{content}</h3> */}
        
      
    </div>
  );
};

export default Home;



{/*         
      <div className="col-md-6">
        <h4>users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {user.username}<br></br>
                  {user.email}<br></br>
                  {user.adres}
                  
                </li>
              ))}
          </ul>
        </div> */}