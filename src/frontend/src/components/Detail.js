import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import Moment from 'react-moment';
function Detail() {
  const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const location = useLocation();
    const loc = location.state.period 
    const { register, handleSubmit,reset, watch, formState: { errors } } = useForm({
        mode:"all"
      })
    const deletelocation = async (id) => {
     await axios.delete(`${baseUrl}/Periodictasks/${id}/`).then(
        navigate('/')
      ) 
  
    }
    console.log(loc.name)
    useEffect(() => {
      reset(loc)
    }
  , []);
   
    const onSubmit = async (data) => { 
      console.log(data)
      return await axios.put(`${baseUrl}/Periodictasks/${loc.id}/`,{
          name: data.name,
          description: data.description,
          command:loc.command,
          interval:loc.interval,
          status: data.status
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
      {loc.status === "active" ? 
        <div className="alert alert-success" role="alert">
          This task is active
          </div>
         : 
        <div className="alert alert-danger" role="alert">
          This task is inactive
          </div>
          }
    </div>
   <div>
    <div className="card-text">
     {loc.description}
     </div>
   </div>
    <div className='d-flex justify-content-around p-3'>
<div className="card border-info mb-3" >
  <div className="card-header">Command</div>
  
  <div className="card-body text-success">
  <ul className="list-group list-group-flush">
   <li className="list-group-item">Name:{loc.command.name}</li>
   
   <li className="list-group-item">Command:{loc.command.command}</li>
   <p>{loc.command.description}</p>
   

  
   </ul>
  </div>
    </div>
    <div className="card border-info mb-3" >
  <div className="card-header">IntervaL</div>
  
  <div className="card-body text-success">
  <ul className="list-group list-group-flush">
   <li className="list-group-item">Interval: {loc.interval.numberofperioods} 
  
   {loc.interval.intervalperiods}</li>
   <li className="list-group-item">Updated: <Moment format="D MMM YYYY HH:mm" withTitle >{loc.updated_at}</Moment> </li>
   </ul>
  </div>
    </div>
    
    
  </div>
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
        <select  {...register("status")} className="form-select" aria-label="Default select example">
 
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
            </select>
            <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-dark">Save changes</button>
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