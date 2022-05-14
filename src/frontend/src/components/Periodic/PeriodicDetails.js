import React from 'react'
import Moment from 'react-moment';
import {  
  useNavigate,
} from "react-router-dom";
function PeriodicDetails({period, index}) {
    const navigate = useNavigate();
    const todetails=()=>{
        navigate(`/periodic/${period.id}`,{state:{period}});
        }

  return (
    <ol  className="list-group ">
    <li className="list-group-item d-flex justify-content-between align-items-start m-1 shadow p-2">
      <div className="ms-2 d-flex align-items-start flex-column ">
        <div className="fw-bold "  onClick={()=>{todetails()}}><span class="badge bg-dark">{index+1}</span><span className='lead px-1 text-info'>{period.name}</span> </div>
       <p className='p-1 ml-3'> {period.description}</p>
      </div>
      <div className="ms-2 d-flex align-items-start flex-column">
        <div className="fw-light">Run every:{period.interval.numberofperioods} {period.interval.intervalperiods} </div>
       <div className="fw-light">Updated: <Moment format="D MMM YYYY HH:mm" withTitle >{period.updated_at}</Moment></div>

       
      </div>
      <span className="badge bg-black rounded-pill fst-italic">{period.command.command} </span>
    </li>
   
   
  </ol>
  )
}

export default PeriodicDetails