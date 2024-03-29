import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AddToWatchList } from '../components';
import { useSelector } from 'react-redux';
import { server } from '../constants';

function CoinMarketData() {
  const [marketData, setMarketData] = useState([]);
  const [page, setPage] = useState(1);
  const [watchList, setWatchList] = useState([]);
  const navigate = useNavigate();
  const currency = useSelector(state => state.currencyReducer.currency);

  useEffect(() => {
    // const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;
    const apiUrl = `/coinMarketData${currency}.json`;
    axios.get(apiUrl)
    .then((response) => {
      console.log(response.data)
      setMarketData(response.data);
    })
    .catch((error) => console.error("Error fetching coin market data: ", error))
  }, [currency])

  useEffect(() => {
    axios.get(`${server}/api/v1/users/watchlist`, {
      withCredentials: true
    })
    .then(response => {
      // console.log(response.data.data.watchList)
      setWatchList(response.data.data.watchList);
    })
    .catch(error => console.error("Error fetching watchlist data from backend: ", error));
  }, [watchList])

  const handleClick = (coinId) => {
    navigate(`/coin-detail/${coinId}`)
  }

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-row flex-wrap justify-center'>
        {marketData?.slice(page*15 - 15, page*15).map(data => {
          return <div
            key={data.id}
            className='border my-2 ml-1 mr-1 sm:w-1/4 md:w-1/6 h-auto flex flex-col justify-between items-center'
          >
            <div onClick={() => handleClick(data.id)} className='flex flex-col hover:cursor-pointer hover:bg-black hover:text-white rounded bg-blue-200 justify-center items-start w-full'>
              <p className='self-center'><img src={data.image} /></p>
              <h2 className='text-4xl'>{data.id}</h2>
              <h3> <span className='text-3xl'>{data.current_price}</span> {currency.toUpperCase()}</h3>
              <p className={`mt-0.5 rounded-lg px-2 ${data.price_change_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>{data.price_change_24h}</p>
              <p className={`mt-0.5 rounded-lg px-2 ${data.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>{data.price_change_percentage_24h}%</p>
            </div>
            {watchList.some(item => item === data.id) 
            ? <button className='bg-green-500 p-4 w-3/4 rounded-3xl'></button> 
            : <AddToWatchList coinId={data.id}></AddToWatchList>}
          </div>
        })}
      </div>
      <div
          className='border border-black inline-block mt-4'
        >
          {page>1 && <button
            className='border border-black p-2'
            onClick={() => handlePageChange(page-1)}
          >◀️</button>}
          {marketData && marketData.length > 0 && [...Array(Math.ceil(marketData.length/15))].map((_, index) => <button
            className={`border border-black px-4 py-2 ${index==page-1?'bg-blue-300':''}`}
            onClick={() => handlePageChange(index + 1)}
            key={index}
          >{index + 1}</button>)}
          {page < Math.ceil(marketData.length/15) && <button
            className='border border-black p-2'
            onClick={() => handlePageChange(page+1)}
          >▶️</button>}
        </div>
    </div>
  )
}

export default CoinMarketData