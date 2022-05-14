import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {  
    useNavigate,
  } from "react-router-dom";
function AddClocked() {
  // get baseurl from .env
  const baseUrl = process.env.REACT_APP_BASE_URL;

  
    const navigate = useNavigate();
    const [commands, setcommands] = useState([])
    const { register, handleSubmit,reset, watch, formState: { errors } } = useForm({
      mode:"all"
    })
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
        fetchcommands()
        }, [])
    const onSubmit = async (data) => { 
      return axios.post(`${baseUrl}/ClockedTask/`,{
        name: data.name,
      description: data.description,
        command: data.command,
        timetorun: data.timetorun
      }).then(
        navigate('/allclocked')
      ) 
  
    }
  return (
    <div className='container shadow w-75 p-5'> <form onSubmit={handleSubmit(onSubmit)}>
         <h5 className="text-center fs-2 text">Add Clocked Schedules </h5>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input  {...register("name", { required: true })} type="text" className="form-control" id="name" placeholder="name"/>
      {errors.name && <span className='text-danger'>This field is required</span>}
      </div>
      <div className="mb-3">
      <label htmlFor="description" className="form-label">Descripotion</label>
      <input  {...register("description", { required: true })} type="text" className="form-control" id="description" placeholder="description"/>
      {errors.description && <span className='text-danger'>This field is required</span>}
      </div>

      <div className="mb-3">
      <label htmlFor="timetorun" className="form-label">Descripotion</label>
      <input  {...register("timetorun", { required: true })} type="datetime-local" className="form-control" id="timetorun" placeholder="time to run"/>
      {errors.timetorun && <span className='text-danger'>This field is required</span>}
      </div>
   {/* multi command select */}
   <select multiple="multiple"  {...register("command")} className="form-select" aria-label=" select examultiple commandsple">
            {commands.map((command, index) => {
              return (
                <option key={index} value={command.id}>{command.name}</option>
              )
            })}
        </select>
      <div className="d-flex justify-content-end my-3">
          <button type="submit" className="btn btn-dark">Save </button>
        </div>
      </form></div>
  )
}

export default AddClocked