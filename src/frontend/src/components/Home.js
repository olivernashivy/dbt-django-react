import React, {useEffect, useState} from 'react'
import Header from './Header'
import Clocked from './clocked/clocked'
import Periodic from './Periodic/Periodic'
import axios from 'axios'
function Home() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [clockedschedule, setclockedschedule] = useState([])
  const [periodictask, setperiodictask] = useState([])
  useEffect(() => {
    // get clocked tasks
   const clocked= axios.get(`${baseUrl}/ClockedTask/`).then(res => {
      setclockedschedule(res.data)
      }).catch(err => {
        console.log(err)
      })
    
    const periodic = axios.get(`${baseUrl}/Periodictasks/`).then(res => {
      setperiodictask(res.data)
      }).catch(err => {
        console.log(err)
      })
    
    },

   [])


  return (
    <div>
        <Header title="All Schedules"/>
        
      
        <div className='d-flex container flex-column mx-3 px-3'>
        <div className='col-md-10'>

         
        <a href='/allclocked' className='d-flex justify-content-start fst-italic ml-3 display-6 text-black mb-1'>Clocked Schedules({clockedschedule.length})</a>
        <Clocked clock={clockedschedule}/>
        </div>
        <div className='col-md-10 mt-4'>
         
      <a href='/allperiodic' className='d-flex justify-content-start fst-italic ml-3 display-6 text-black mb-1'>Periodic Tasks({periodictask.length})</a>
      <Periodic periods={periodictask}/>
      </div>
        </div>
       
       


        
        
        </div>
  )
}

export default Home