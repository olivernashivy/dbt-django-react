import React from 'react'

import PeriodicDetails from './PeriodicDetails';
 
function Periodic({periods}) {

  return (
    <div className='shadow-lg'>
      {periods.map((period, index) => {

        return (
         <div  key={index}>
           <PeriodicDetails period={period} index={index}/>
         </div>
        )
      })}
   
    </div>
  )
}

export default Periodic