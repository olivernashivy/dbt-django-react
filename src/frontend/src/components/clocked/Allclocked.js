import React, {useEffect, useState} from 'react'
import Clocked from './clocked';
import Header from '../Header'
import axios from 'axios'
import {  
  useNavigate,
} from "react-router-dom";
function Allclocked() {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [clockedschedule, setclockedschedule] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    // get periodic tasks
    const periodic = axios.get(`${baseUrl}/ClockedTask/`).then(res => {
      setclockedschedule(res.data)
      }).catch(err => {
        console.log(err)
      }
    )
  }, [])
  
  return (
    <div>
      <Header title="All Periodic Tasks"/>
       
      <div className='d-flex container flex-column mx-3 px-3'>
        <div className='col-md-10'>
        <div className='d-flex justify-content-end m-2'>
          {/*Add buuton on the right */}
          <button className="btn btn-dark btn-sm"
          onClick={() => navigate('/addclocked')}>
          Add Clocked Task
          </button>
        </div>
        <Clocked clock={clockedschedule}/>
          </div>
          </div>
    </div>
  )
}

export default Allclocked