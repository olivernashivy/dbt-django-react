import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {  
    useNavigate,
  } from "react-router-dom";
function Addinterval() {
  const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const { register, handleSubmit,reset, watch, formState: { errors } } = useForm({
      mode:"all"
    })
   const intervalperiods = [
     'minutes', 'hours', 'days', 'weeks', 'months', 'years'
   ]
    const onSubmit = async (data) => { 
      return axios.post(`${baseUrl}/interval/`,{
        numberofperioods: data.numberofperioods,
        intervalperiods: data.intervalperiods,
      }).then(
        navigate('/')
      ) 
  
    }
  return (
    <div className='container shadow w-75 p-5'> <form onSubmit={handleSubmit(onSubmit)}>
         <h5 className="text-center fs-2 text">Add Interval </h5>
    <div className="mb-3">
      <label htmlFor="numberofperioods" className="form-label">number of perioods</label>
      <input  {...register("numberofperioods", { required: true })} type="number" className="form-control" id="numberofperioods" placeholder="number of perioods"/>
      {errors.name && <span className='text-danger'>This field is required</span>}
      </div>
      <div className="mb-3">
      <label htmlFor="intervalperiods" className="form-label">intervalperiods</label>
      <select  {...register("intervalperiods", { required: true })} className="form-control" id="intervalperiods">  
        {intervalperiods.map(intervalperiod => (
          <option key={intervalperiod} value={intervalperiod}>{intervalperiod}</option>
        ))}
      </select>
      </div>

    
   
      <div className="d-flex justify-content-end my-3">
          <button type="submit" className="btn btn-dark">Save </button>
        </div>
      </form></div>
  )
}

export default Addinterval