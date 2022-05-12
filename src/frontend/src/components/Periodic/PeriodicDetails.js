import React from 'react'
import Moment from 'react-moment';
import {  
  useNavigate,
} from "react-router-dom";
function PeriodicDetails({period}) {
    const navigate = useNavigate();
    const todetails=()=>{
        navigate(`periodic/${period.id}`,{state:{period}});
        }

  return (
    <ul  className="list-group list-group-numbered">
    <li className="list-group-item d-flex justify-content-between align-items-start m-1 shadow p-2">
      <div className="ms-2 me-auto">
        <div className="fw-bold"  onClick={()=>{todetails()}}>{period.name}</div>
       {period.description}
      </div>
      <div className="ms-2 me-auto">
        <div className="fw-bold">Run every:{period.interval.numberofperioods} {period.interval.intervalperiods} </div>
       <div className="fw-bold">Updated: <Moment format="D MMM YYYY HH:mm" withTitle >{period.updated_at}</Moment></div>

       
      </div>
      <span className="badge bg-primary rounded-pill">{period.command.command} </span>
    </li>
   
   
  </ul>
  )
}

export default PeriodicDetails