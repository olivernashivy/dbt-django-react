import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import Moment from 'react-moment';
function Detail() {
  const baseUrl = process.env.REACT_APP_BASE_URL
   const [commands, setcommands] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const loc = location.state.clocked 
    const { register, handleSubmit,reset, watch, formState: { errors } } = useForm({
        mode:"all"
      })
    const deletelocation = async (id) => {
     await axios.delete(`${baseUrl}/ClockedTask/${id}/`).then(
        navigate('/')
      ) 
  
    }
    const fetchcommands = async () => {
      await axios.get(`${baseUrl}/schedulecommand/`).then(res => {
        setcommands(res.data)
      }
      ).catch(err => {
        console.log(err)
      }
      )
      }
  
    useEffect(() => {
      reset(loc)
     // call fetchcommands
  
       fetchcommands()
      }, [])
        
      
      
    const onSubmit = async (data) => { 
      console.log(data)
      return await axios.patch(`${baseUrl}/ClockedTask/${loc.id}/`,{
          name: data.name,
          description: data.description,
          command:data.command,
          timetorun: data.timetorun
      }
      ).then(
        navigate('/')
      ) 
  
    }
  return (
    <div >
     <div className="container ">
     <div className="card" >
      
  <div className="card-body ">
      <div className='d-flex justify-content-around p-3 align-items-center'>
      <h5 className="card-title fst-italic ml-3">{loc.name} </h5>
    <button className="btn btn-dark" onClick={() => navigate(-1)}>Go back</button>
      </div>
    <div>
      {loc.timetorun > <Moment toNow ></Moment> ? 
        <div className="alert alert-success" role="alert">
          This task is going to run in <Moment date={loc.timetorun} withTitle durationFromNow > </Moment>
          </div>
         : 
        <div className="alert alert-danger" role="alert">
          This task is already run  <Moment date={loc.timetorun} withTitle durationFromNow > </Moment> ago
          </div>
          }
    </div>
   <div>
    <div className="card-text">
     {loc.description}
     </div>
   </div>
    <div className='d-flex justify-content-around p-3'>
<div className="card border-primary mb-3" >
  {/* filter commands for each available loc.command */}
  <div className="card-header">Available commands</div>
  <div className="card-body">
    <ul className="list-group">
      {loc.command.map((comm, index) => {
        return (
          <div key={index}>
            {commands.map((command, index) => {
              if (command.id === comm) {
                return (
                  <div key={index}>
                  <li className="list-group-item">
                    Name: {command.name}
                  </li>
                  <li className="list-group-item">
                  Command: {command.command}
                </li>
                <p>{command.description}</p>
                </div>
                )
              }
            })}
      
            </div>
        )
      })}

    </ul>
  </div>
 
    
    </div> </div>
  <div className="card-body">
    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-link btn btn-dark btn-sm">Edit </a>
    <a onClick={ () =>deletelocation(loc.id)} href="#" className="card-link text-danger btn btn-outline-danger btn-sm">Delete </a>
  </div>
 
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit {loc.name}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input  {...register("name")} type="text" className="form-control" id="name" placeholder="name"/>
        </div>
        <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea  {...register("description")} type="text" className="form-control" id="description" placeholder="description">
          </textarea>
        </div>
        {/* multi command select */}
        <select multiple="multiple"  {...register("command")} className="form-select" aria-label=" select examultiple commandsple">
            {commands.map((command, index) => {
              return (
                <option key={index} value={command.id}>{command.name}</option>
              )
            })}
        </select>

        <div className="mb-3">
        <label htmlFor="timetorun" className="form-label">time to run</label>
        <input  {...register("timetorun")} type="datetime-local" className="form-control" id="timetorun" placeholder="name"/>
        </div>
       
            <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
          </form>
      </div>
   
     
    </div>
  </div>
</div>
</div>
     </div>
     </div> </div>
  )
}

export default Detail