import axios from 'axios';
import React from 'react'

function AddToWatchList({coinId}) {

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Add to watchlist handle click ", coinId);
    axios.post('http://localhost:8000/api/v1/users/add-to-watchlist', {
      coinId
    }, {
      withCredentials: true
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch(error => console.error("Unable to Add to WatchList: ", error))
  }

  return (
    <button
      className='bg-blue-500 text-white p-2 rounded w-full shadow-lg'
      onClick={handleClick}
    >
      Add To Watchlist
    </button>
  )
}

export default AddToWatchList