import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { server } from '../constants'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${server}`, {
      username: "worf",
      email: "emailworf",
      password: "12345678"
    }, {withCredentials: true})
    .then(response => {
      console.log(response)
    })
    .catch(error => console.error("Error occured : ", error))
    .finally(() => console.log("checked vercel server"))
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post(`${server}/api/v1/users/login`, {
      username,
      email: username,
      password
    }, {
      withCredentials: true
    })
    .then(response => {
      navigate('/');
    })
    .catch(error => console.error("Error: ", error))
  }

  return (
    <div
      className='min-h-screen w-full bg-[#ddd] flex flex-col justify-center items-center'
    >
      <div
        className='bg-gray-400 p-10'
      >
        <div
          className='my-5'
        >
          LOGIN
        </div>
        <form 
          onSubmit={(e) => onSubmit(e)}
          className='flex flex-col'
        >
          <input 
            className='rounded my-2 p-1'
            type="text"
            placeholder='username or email'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='rounded my-2 p-1'
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='bg-blue-600 text-white m-2 p-1'
            type='submit'
          >Submit</button>
        </form>
      </div>
      <Link
        className='text-blue-800 hover:underline'
        to={'/signup'}
      >
        Sign-up
      </Link>
    </div>
  )
}

export default Login