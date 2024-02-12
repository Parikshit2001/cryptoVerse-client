import React from 'react'
import Logout from './Logout'
import SetCurrency from './SetCurrency'
import WatchList from './WatchList'

function Header() {
  return (
    <div
      className='flex justify-between w-full bg-blue-300 p-2 sticky top-0 shadow-sm'
    >
      <SetCurrency />
      <WatchList />
      <Logout />
    </div>
  )
}

export default Header