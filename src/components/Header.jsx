import React from 'react'
import Logout from './Logout'
import SetCurrency from './SetCurrency'
import WatchList from './WatchList'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  return (
    <div
      className='flex justify-between w-full bg-blue-300 p-2 sticky top-0 shadow-sm'
    >
      <div>
        <SetCurrency />
        <button 
          className='bg-blue-500 p-2 text-white rounded m-2'
          onClick={() => navigate('/')}
        >
          HOMEPAGE
        </button>
      </div>
        <WatchList />
      <Logout />
    </div>
  )
}

export default Header