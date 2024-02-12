import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AddToWatchList } from '../components';
import { useSelector } from 'react-redux';

function CoinMarketData() {
  const [marketData, setMarketData] = useState([]);
  const navigate = useNavigate();
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

  const handleClick = (coinId) => {
    navigate(`/coin-detail/${coinId}`)
  }

  return (
    <div className='flex flex-row flex-wrap justify-start'>
      {marketData?.map(data => {
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
          <AddToWatchList coinId={data.id}></AddToWatchList>
        </div>
      })}
    </div>
  )
}

export default CoinMarketData

// {/* id": "bitcoin",
// "symbol": "btc",
// "name": "Bitcoin",
// "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
// "current_price": 42926,
// "market_cap": 842575284217,
// "market_cap_rank": 1,
// "high_24h": 43247,
// "low_24h": 42884,
// "price_change_24h": -229.75325689946476,
// "price_change_percentage_24h": -0.53238,
// "market_cap_change_24h": -4145167403.392212,
// "market_cap_change_percentage_24h": -0.48956,
// "circulating_supply": 19617681,
// "total_supply": 21000000,
// "max_supply": 21000000,
// "last_updated": "2024-02-04T04:27:02.867Z" */}