import React from 'react'

import ClockedDetails from './ClockedDetails';
function Clocked({clock}) {
  return (
    <div className='shadow-lg'>
      {clock.map((clocked, index) => {

        return (
          <div  key={index}>
            <ClockedDetails clocked={clocked} />
          </div>
        )
      })}
   
    </div>
  )
}

export default Clocked