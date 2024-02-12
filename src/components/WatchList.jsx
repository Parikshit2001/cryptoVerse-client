import React from 'react'
import { useNavigate } from 'react-router-dom';

function WatchList() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/watchlist-market-data')
  }

  return (
    <button 
      className='bg-blue-500 text-white rounded p-2 m-2'
      onClick={handleClick}
    >
      WatchList
    </button>
  )
}

export default WatchList