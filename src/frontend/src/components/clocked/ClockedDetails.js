import React from 'react'
import Moment from 'react-moment';
import {  
    useNavigate,
  } from "react-router-dom";
function ClockedDetails({clocked}) {
    const navigate = useNavigate();
    const todetails=()=>{
        navigate(`clocked/${clocked.id}`,{state:{clocked}});
        }
  return (
    <div>

        <ul className="list-group list-group-numbered">
          <li className="list-group-item d-flex justify-content-between align-items-start m-1 shadow p-2">
            <div className="ms-2 me-auto">
              <div className="fw-bold"  onClick={()=>{todetails()}}>{clocked.name}</div>
             {clocked.description}
            </div>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Created: <Moment format="D MMM YYYY HH:mm" withTitle >{clocked.created_at}</Moment></div>
             <div className="fw-bold">Updated: <Moment format="D MMM YYYY HH:mm" withTitle >{clocked.updated_at}</Moment></div>
             {clocked.timetorun > <Moment toNow ></Moment>?
             
              <div className="fw-bold">Will run in <Moment date={clocked.timetorun} withTitle durationFromNow > </Moment></div>
              :
              <div className="fw-bold "><span className='text-danger'> Has run </span>
              <span>on <Moment date={clocked.timetorun} withTitle > </Moment> </span>
              </div>}
            </div>
            <span className="badge bg-primary rounded-pill">{clocked.command.length} Command</span>
          </li>
         
         
        </ul>
    </div>
  )
}

export default ClockedDetails