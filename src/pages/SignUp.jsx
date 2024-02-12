import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/v1/users/register', {
      username,
      email,
      password
    })
    .then(response => {
      console.log("Response: ", response);
    })
    .then(() => {
      axios.post('http://localhost:8000/api/v1/users/login', {
      username,
      email: username,
      password
    })
    .then(data => {
      console.log(data);
      navigate('/');
    })
    })
    .catch(error => {
      console.error("Error: ", error)
    })
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
          SIGN UP
        </div>
        <form 
          onSubmit={(e) => onSubmit(e)}
          className='flex flex-col'
        >
          <input 
            className='rounded my-2 p-1'
            type="text"
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='rounded my-2 p-1'
            type="text"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        to={'/login'}
      >
        Login
      </Link>
    </div>
  )
}

export default SignUp