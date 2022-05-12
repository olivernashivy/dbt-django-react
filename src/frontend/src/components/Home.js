import React, {useEffect, useState} from 'react'
import Header from './Header'
import Clocked from './clocked/clocked'
import Periodic from './Periodic/Periodic'
import axios from 'axios'
function Home() {
  const baseUrl = 'http://localhost:8000'
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

         
        <h4 className='d-flex justify-content-start'>Clocked Schedules</h4>
        <Clocked clock={clockedschedule}/>
        </div>
        <div className='col-md-10 mt-4'>
         
      <h4 className='d-flex justify-content-start'>Periodic Tasks</h4>
      <Periodic periods={periodictask}/>
      </div>
        </div>
       
       


        
        
        </div>
  )
}

export default Home