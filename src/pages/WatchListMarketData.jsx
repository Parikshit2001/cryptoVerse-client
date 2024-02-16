import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { server } from '../constants';

function WatchListMarketData() {
  const [marketData, setMarketData] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const currency = useSelector(state => state.currencyReducer.currency);


  useEffect(() => {
    // const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;
    const apiUrl = '/coinMarketData.json';
    axios.get(apiUrl)
    .then((response) => {
      // console.log(response.data)
      setMarketData(response.data);
    })
    .catch((error) => console.error("Error fetching coin market data: ", error))
  }, [currency])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${server}/api/v1/users/watchlist`, {
      withCredentials: true
    })
    .then(response => {
      // console.log(response.data.data.watchList)
      setWatchList(response.data.data.watchList);
    })
    .catch(error => console.error("Error fetching watchlist data from backend: ", error));
  }, [])

  const handleClick = (coinId) => {
    navigate(`/coin-detail/${coinId}`)
  }

  const handleRemove = (coinId) => {
    console.log(coinId)
    axios.post(`${server}/api/v1/users/remove-from-watchlist`, {
      coinId
    }, {
      withCredentials: true
    })
    .then(response => {
      console.log(response)
      setWatchList(prev => prev.filter(item => item !== coinId))
    })
    .catch(error => {
      console.error("Error removing the coin: ", error)
    })
  }

  return (
    <div className='flex flex-row flex-wrap justify-start'>
      {watchList.length > 0 && marketData?.filter(item => watchList.includes(item.id)).map(data => {
        return <div
          key={data.id}
          className='border my-2 ml-1 mr-1 sm:w-1/4 md:w-48'
        >
          <div onClick={() => handleClick(data.id)} className='flex flex-col hover:cursor-pointer hover:bg-black hover:text-white rounded bg-blue-200'>
            <p className='text-3xl'>{data.id}</p>
            <p><img src={data.image} /></p>
            <p>Current price: {data.current_price}</p>
            <p className={`${data.price_change_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>{data.price_change_24h}</p>
            <p className={`${data.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>{data.price_change_percentage_24h}%</p>
          </div>
          <button
            className='bg-blue-500 text-white rounded p-2 w-full'
            onClick={() => handleRemove(data.id)}
          >
            Remove
          </button>
      </div>
      })}
    </div>
  )
}

export default WatchListMarketData