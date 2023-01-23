import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

import "bootstrap/dist/js/bootstrap.bundle"

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModeratorAdd from "./components/BoardModeratorAdd";
import BoardAdmin from "./components/BoardAdmin";
import BoardModeratorProducts from "./components/BoardModeratorProducts";
import BoardAdminEdit from "./components/BoardAdminEdit";
import BoardModeratorEdit from "./components/BoardModeratorEdit";
import UserSettings from "./components/UserSettings";
import SingleProductPage from "./components/SingleProductPage"
import ProfileCurrentRaffle from "./components/ProfileCurrentRaffle";
import ProfileWonRaffle from "./components/ProfileWonRaffle";
import Notification from "./components/notification";
import notificationService from "./services/notificationService";
import HomeCategory from "./components/HomeCategory";
import categoryService from "./services/categoryService";
import Order from "./components/CreateOrder";
import BoardModOrders from "./components/BoardModOrders";

import BoardModeratorEditTest from "./components/EDITADMINTEST";
import BoardModeratorTest from "./components/TESTMODCREATE";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";
import ProfileMyOrder from "./components/ProfileMyOrder";
import BoardModSingleOrder from "./components/BoardModSingleOrder";




const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  ///notifications
  const[currentUserNotification, setCurrentUserNotification] = useState("");
  ///category
  const [category, setCategory] = useState("");


  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  ///notifications
  const getNotification = () => {
    var data = {
      _id: currentUser._id
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

  //categories
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
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router>
      
      <div>
      <body className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            SugarCrapRaffle
          </Link>
          
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Category
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                {category && category.map((category, index) => 
                  <Link to={"../product/category/" + category._id}  key={index} className="nav-link"><a class="dropdown-item">{category.name}</a></Link>
              )}
                </div>   
            </li>


            {/* {showModeratorBoard ?
                (<li className="nav-item">
                  <Link to={"/product"} className="nav-link">
                    Product Mgmt
                  </Link>
                </li>):
                (<></>)
            } */}
           
            {showModeratorBoard && (
              // <li className="nav-item">
              //   <Link to={"/mod"} className="nav-link">
              //     Moderator Board
              //   </Link>
              // </li>

                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Products mgmt
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to={"/product"} className="nav-link"><a class="dropdown-item">Products Actions</a></Link>
                  <Link to={"/mod"} className="nav-link"><a class="dropdown-item">Product Add</a></Link>
                  <Link to={"/orders"} className="nav-link"><a class="dropdown-item">Orders List</a></Link>
                </div>   
                </li>

            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Users mgmt
                </Link>
              </li>
            )}

            {/* {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )} */}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto" >
            {/* notifications */}
              <li class="nav-item dropdown" >
                  <a class="nav-link dropdown-toggle" onClick={getNotification} href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="100,20" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg>
                  </a>
                  <div class="dropdown-menu" style={{ minWidth:300, left:-40}} aria-labelledby="navbarDropdown">
                    {currentUserNotification ?
                        (<ul style={{listStyleType:"none", marginLeft:"-20px",marginRight:"10px", minWidth:300 }}>
                          {currentUserNotification &&
                            currentUserNotification.map((a, index) => 
                            // reverse().slice(0, 8).
                              <li  key={index}>
                                {a.product && a.product.map((b,index)=>
                                <span className="row" key={index}>
                                    <span className="col" >
                                      <Link to={"../product/card/" + b._id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                        <img src={b.imageFile}  width="40px" height="40px" style={{marginTop:"10px"}} class="rounded-circle"></img>
                                      </Link>
                                    </span> 
                                    <span className="col-9" style={{paddingLeft:0}}>{a.content}</span> 
                                </span>
                                )}
                                <div class="dropdown-divider"></div>
                              </li>)}
                        </ul>)
                      :(<></>)
                    }
                  </div>   
              </li>
            {/* notifications */}

              {/* dropdown */}
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My Raffles
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to={"../profile/currentraffles/" + currentUser._id} className="nav-link"><a class="dropdown-item">Current Raffles</a></Link>
                  <Link to={"../profile/wonraffles/" + currentUser._id} className="nav-link"><a class="dropdown-item">Won Raffles</a></Link>
                  <div class="dropdown-divider"></div>
                  <Link to={"../profile/myorders/" + currentUser._id} className="nav-link"><a class="dropdown-item">My Orders</a></Link>
                  
                  {/* <Link to={"../profile/notifications"} className="nav-link"><a class="dropdown-item">Notifications</a></Link> */}
                  </div>   
              </li>
              {/* dropdown */}

              <li className="nav-item">
                <Link to={"/profile/" + currentUser._id} className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg> {currentUser.username}
                </Link>
              </li>

              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>

          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<BoardUser />} />
            {/* BoardModeratorTest ZAMIAST BoardModeratorAdd */}
            <Route path="/mod" element={<BoardModeratorAdd/>} /> 

            <Route path="/admin" element={<BoardAdmin />} />

            {/* products routes */}
            <Route path="/product" element={<BoardModeratorProducts/>}/>
            <Route path="/product/:id" element={<BoardModeratorEdit/>}/>
            <Route path="/product/card/:id" element={<SingleProductPage/>}/>
            <Route path="/product/category/:id" element={<HomeCategory/>}/>

            {/* <Route path="/getusers" element={<BoardAdmin />}/> */}
            <Route path="/editUser/:id" element={<BoardAdminEdit/>}/>
            <Route path="/profile/settings/:id" element={<UserSettings/>}/>

            {/* profile routes */}
            <Route path="/profile" element={<Profile/>} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="/profile/currentraffles/:id" element={<ProfileCurrentRaffle/>}/>
            <Route path="/profile/wonraffles/:id" element={<ProfileWonRaffle/>}/>
            <Route path="/profile/myorders/:id" element={<ProfileMyOrder/>}/>
            <Route path="/profile/notifications" element={<Notification/>}/>

            {/* order routes */}
            <Route path="/order/product/:id" element={<Order/>}/>
            <Route path="/orders/" element={<BoardModOrders/>}/>
            <Route path="/order/:id" element={<BoardModSingleOrder/>}/>

          </Routes>
        </div> 
        <footer className="mt-auto bg-dark" >
          <div className="text-center p-3 text-white"style={{backgroundColor:" #343a40"}} >
           © 2022 Copyright: SugarCrapRaffle
          </div>
        </footer>
        </body>
      </div>
      
    </Router>
  );
};

export default App;