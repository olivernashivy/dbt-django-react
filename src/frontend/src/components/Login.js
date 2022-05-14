import React, {useState, useEffect} from 'react'
import axios from 'axios'
function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [errorlog, seterror] = useState('')

    const baseUrl = process.env.REACT_APP_BASE_URL
    const login = async () => {
        await axios.post(`${baseUrl}/auth/token/login/`, {
            username: username,
            password: password
        }).then(res => {
            if (res.data.auth_token) {
                localStorage.setItem('token', res.data.auth_token)
                window.location.href = '/'
            } else {
            
              
                
                    seterror('Invalid token')
                
            }
        }
        ).catch(err => {
            console.log(err)
            if(err.response.data.non_field_errors){
                seterror(err.response.data.non_field_errors[0])
            }
            if(err.response.data.detail){
                seterror(err.response.data.detail)
            }
            else{
                seterror('Invalid username or password')
            }
        }
        )
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
           window.location.href = '/'
        }
    }, [])

   const  handleSubmit = (e) => {
        e.preventDefault()
        login()
    }

  return (
    <div>
         <div className='d-flex justify-content-center align-items-center container  mx-3 px-3 mt-5'>
        <div className='col-md-8 shadow p-4'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group ">
            <div className="mb-3 d-flex justify-content-between gap-2">
            <label className='text-left p-1 w-25'>Username</label>
            <input className='form-control' type="text" name="username" onChange={(e) => setusername(e.target.value)} />
            </div>
            <div className="mb-3 d-flex justify-content-between gap-2">
            <label className='p-1 w-25'>Password</label>
            <input className='form-control' type="password" name="password" onChange={(e) => setpassword(e.target.value)} />
            </div>
            <button className='btn btn-primary btn-sm' type="submit">Login</button>
            </div>
        </form>
        <p className='p-2 m-2 text-danger'>{errorlog}</p>

        
        
    </div>
    </div>
    </div>
  )
}

export default Login