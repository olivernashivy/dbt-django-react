import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {  
    useNavigate,
  } from "react-router-dom";
function AddPeriodic() {
  const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const [commands, setcommands] = useState([])
    const [interval, setinterval] = useState([])
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
    const fetchinterval = async () => {
      await axios.get(`${baseUrl}/interval/`).then(res => {
        setinterval(res.data)
      }
      ).catch(err => {
        console.log(err)
      }
      ) }

      useEffect(() => {
        fetchcommands()
        fetchinterval()
        }, [])
    
    const onSubmit = async (data) => { 
      const intervals = interval.find(item => item.id === Number(data.interval))
      const command = commands.find(item => item.id === Number(data.command))
      console.log(intervals)
      console.log(command)
      if (intervals && command) {
      return axios.post(`${baseUrl}/Periodictasks/`,{

        name: data.name,
        description: data.description,
        command: command,
        status: data.status,
        interval: intervals,
      }).then(
        navigate('/allperiodic')
      ) 
  
    }
    else {
      alert("Please select a command and an interval")
    }
  }
  return (
    <div className='container shadow w-75 p-5'> <form onSubmit={handleSubmit(onSubmit)}>
         <h5 className="text-center fs-2 text">Add Periodic Tasks </h5>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input  {...register("name", { required: true })} type="text" className="form-control" id="name" placeholder="name"/>
      {errors.name && <span className='text-danger'>This field is required</span>}
      </div>
     

      <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <input  {...register("description", { required: true })} type="text" className="form-control" id="description" placeholder="description"/>
      {errors.timetorun && <span className='text-danger'>This field is required</span>}
      </div>
      <div className="mb-3">
      <label htmlFor="status" className="form-label">Status</label>
      <select {...register("status", { required: true })} className="form-select" aria-label=" select status">
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      </select>
      </div>
   {/* multi command select */}
      <div className="mb-3">
      <label htmlFor="command" className="form-label">Command</label>
   <select  {...register("command")} className="form-select" aria-label=" select examultiple commandsple">
            {commands.map((command, index) => {
              return (
                <option key={index} value={command.id}>{command.name}</option>
              )
            })}
        </select>
      </div>
      <div className="mb-3">
      <label htmlFor="interval" className="form-label">Interval</label>
      <select {...register("interval", { required: true })} className="form-select" aria-label=" select interval">
            {interval.map((interval, index) => {
              return (
                <option key={index} value={interval.id}>{interval.numberofperioods} {interval.intervalperiods}</option>
              )
            })}
        </select>
      </div>

      <div className="d-flex justify-content-end my-3">
          <button type="submit" className="btn btn-dark">Save </button>
        </div>
      </form></div>
  )
}

export default AddPeriodic