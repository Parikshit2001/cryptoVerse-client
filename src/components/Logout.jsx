import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    axios.post('https://crypto-verse-server.vercel.app/api/v1/users/logout', {}, {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.error('Error Logging-Out: ', error))
    .finally(() => {
      navigate('/login');
    })
  }

  return (
    <button
      onClick={handleClick}
      className='bg-blue-500 text-white rounded p-2 m-2'
    >
      Logout
    </button>
  )
}

export default Logout