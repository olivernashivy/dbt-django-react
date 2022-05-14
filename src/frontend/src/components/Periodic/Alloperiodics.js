import React, {useEffect, useState} from 'react'
import Periodic from './Periodic'
import Header from '../Header'
import axios from 'axios'
import {  
  useNavigate,
} from "react-router-dom";
function Alloperiodics() {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [periodictask, setperiodictask] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    // get periodic tasks
    const periodic = axios.get(`${baseUrl}/Periodictasks/`).then(res => {
      setperiodictask(res.data)
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
          onClick={() => navigate('/addperiodic')}>
          Add Periodic Task
          </button>
        </div>
          <Periodic periods={periodictask}/>

          </div>
          </div>
    </div>
  )
}

export default Alloperiodics