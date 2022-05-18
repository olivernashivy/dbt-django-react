import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {  
    useNavigate,
  } from "react-router-dom";
function Addcommand() {
  const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const { register, handleSubmit,reset, watch, formState: { errors } } = useForm({
      mode:"all"
    })
   
    const onSubmit = async (data) => { 
      return axios.post(`${baseUrl}/schedulecommand/`,{
        name: data.name,
      description: data.description,
        command: data.command,
      }).then(
        navigate('/')
      ) 
  
    }
  return (
    <div className='container shadow w-75 p-5'> <form onSubmit={handleSubmit(onSubmit)}>
         <h5 className="text-center fs-2 text">Add Schedule Commands </h5>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input  {...register("name", { required: true })} type="text" className="form-control" id="name" placeholder="name"/>
      {errors.name && <span className='text-danger'>This field is required</span>}
      </div>
      <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <input  {...register("description", { required: true })} type="text" className="form-control" id="description" placeholder="description"/>
      {errors.description && <span className='text-danger'>This field is required</span>}
      </div>

      <div className="mb-3">
      <label htmlFor="command" className="form-label">command</label>
      <input  {...register("command", { required: true })} type="text" className="form-control" id="command" placeholder="type the command"/>
      {errors.command && <span className='text-danger'>This field is required</span>}
      </div>
   
      <div className="d-flex justify-content-end my-3">
          <button type="submit" className="btn btn-dark">Save </button>
        </div>
      </form></div>
  )
}

export default Addcommand