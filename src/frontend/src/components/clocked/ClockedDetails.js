import React from 'react'
import Moment from 'react-moment';
import {  
    useNavigate,
  } from "react-router-dom";
function ClockedDetails({clocked, index}) {
    const navigate = useNavigate();
    const todetails=()=>{
        navigate(`/clocked/${clocked.id}`,{state:{clocked}});
        }
    let description = clocked.description
    //cut the text if its over 100 characters
    if(description.length > 100){
        description = description.substring(0,100) + '...'
    }

  return (
    <div>

        <ol className=" container">
          <li className=" row shadow p-2">
            <div className="ms-2 col-md-5  ">
              <div className="fw-bold d-flex justify-content-start gap-3"  onClick={()=>{todetails()}}><span class="badge bg-dark">{index+1}</span><span className='lead px-1 text-info'>{clocked.name}</span></div>
           <div className='d-flex justify-content-start'>  <p className=''> {description}</p> </div>
            </div>
            <div className="ms-2 col align-items-start ">
              <div className="fw-light">Created: <Moment format="D MMM YYYY HH:mm" withTitle >{clocked.created_at}</Moment></div>
             {clocked.timetorun > <Moment toNow ></Moment>?
             
              <div className="fw-light"><i class="bi bi-arrow-bar-right"></i> Will run in  <Moment date={clocked.timetorun} withTitle durationFromNow > </Moment></div>
              :
              <div className="fw-light "><span className='text-danger'><i class=" bi-arrow-bar-right"></i> Has run </span>
              <span>on <Moment date={clocked.timetorun} withTitle > </Moment> </span>
              </div>}
            </div>
            <div className='col-md-2'>
            <span className="badge bg-black rounded-pill fst-italic">{clocked.command.length} Command</span>
            </div>
           
          </li>
         
         
        </ol>
    </div>
  )
}

export default ClockedDetails