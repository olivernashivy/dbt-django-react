import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from './components/Home';
import Detail from './components/Detail';
import ClockDetail from './components/ClockDetail';
import AddClocked from './components/clocked/AddClocked';
import AddPeriodic from './components/Periodic/AddPeriodic';
import Addcommand from './components/command/Addcommand';
import Addinterval from './components/command/Addinterval';
import Alloperiodics from './components/Periodic/Alloperiodics';
import Allclocked from './components/clocked/Allclocked';
import axios from 'axios';
import Login from "./components/Login";
import {  
    useNavigate,
  } from "react-router-dom";
function App() {
    //check if tyhe user is auntenticated
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [user, setuser] = useState(null)
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [isLoggedIn, setisLoggedIn] = useState(false)
    // get token from local storage
    const token = localStorage.getItem('token')
    const fetchuser = async () => {
        if (token !== null||token!==undefined) {

            await axios.get(`${baseUrl}/auth/users/me/`, {
                headers: {
                    Authorization: `Token ${token}`

                }
            }).then(res => {
                setuser(res.data)
                setisAuthenticated(true)
            }
            ).catch(err => {
                console.log(err)
            }
            )
        }
        else {
            setisAuthenticated(false)

            window.location.href = '/login'
        }
    }
    useEffect(() => {
        fetchuser()
    }, [])

    const logout = () => {
      
        localStorage.removeItem('token')
        setisAuthenticated(false)
        setisLoggedIn(false)
        window.location.href = '/login'
       
    }
  return (
    <div className="App">
     <div class="container-fluid">
    <div class="row flex-nowrap">
       {isAuthenticated && <div  class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-black">
            <div class="d-flex flex-column align-items-left align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-left pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Schedules</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start align-items-sm-start" id="menu">
                    <li class="nav-item btn btn-dark ">
                        <a href="/" class="nav-link align-middle px-0 text-white">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                        </a>
                    </li>
                    <li className="text-white">
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link text-white px-0 align-middle  ">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Clocked</span> </a>
                        <ul class="collapse show nav flex-column  " id="submenu1" data-bs-parent="#menu">
                            <li class="w-100 text-left">
                            <a  href='/addclocked'class="nav-link px-0 text-white"> <span class="d-none d-sm-inline">Add</span>  </a>
                            </li>
                            <li class="w-100 text-left"> 
                                <a href="/allclocked" class="nav-link px-0 text-white"> <span class="d-none d-sm-inline">All</span>  </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link text-white px-0 align-middle ">
                            <i class="fs-4 bi-alarm"></i> <span class="ms-1 d-none d-sm-inline">Periodic</span></a>
                        <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="/addperiodic" class="nav-link px-0 text-white"> <span class="d-none d-sm-inline">Add</span> </a>
                            </li>
                            <li>
                                <a href="/allperiodic" class="nav-link px-0 text-white"> <span class="d-none d-sm-inline">All</span> </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" class="nav-link text-white px-0 align-middle ">
                            <i class="fs-4 bi-terminal"></i> <span class="ms-1 d-none d-sm-inline">Comands</span></a>
                        <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="/addcommand" class="nav-link px-0 text-white"> <span class="d-none d-sm-inline"> Command</span> </a>
                            </li>
                            <li>
                                <a href="/addinterval" class="nav-link px-0 text-white"> <span class="d-none d-sm-inline"> Interval</span> </a>
                            </li>
                        </ul>
                    </li>
                  
                </ul>
                <hr/>
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fs-2 bi-person-circle" ></i>
                        <span class="d-none d-sm-inline mx-1">{user.username}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="/addcommand">New Schedule</a></li>
                        <li><a class="dropdown-item" href="/addinterval">New Interval</a></li>
                        <li>
                            <hr class="dropdown-divider"/>
                        </li>
                        <li><a class="dropdown-item" onClick={() => logout()} href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div> }
        <div className="col-sm p-3 min-vh-100">
        <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="periodic/:id" element={<Detail />} />
          <Route path="clocked/:id" element={<ClockDetail />} />
          <Route path="/addclocked" element={<AddClocked />} />
          <Route path="/addperiodic" element={<AddPeriodic />} />
          <Route path='/addcommand' element={<Addcommand />} />
          <Route path='/addinterval' element={<Addinterval />} />
          <Route path="/allperiodic" element={<Alloperiodics />} />
          <Route path="/allclocked" element={<Allclocked />} />
          <Route path ="/login" element={<Login />} />
          </Routes>
          </Router>
        </div>
    </div>
</div>
  
       
    </div>
  );
}

export default App;
