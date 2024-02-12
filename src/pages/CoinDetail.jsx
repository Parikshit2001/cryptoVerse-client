import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import ReactHtmlParser from 'react-html-parser'
import { useParams } from 'react-router-dom';
import { AddToWatchList } from '../components';

function CoinDetail() {
  const [loading, setLoading]  = useState(true);
  const [coinDetail, setCoinDetail] = useState({});
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${id}`;
    // const apiUrl = '/coinDetail.json'
    axios.get(apiUrl)
    .then(response => {
      console.log(response.data);
      setCoinDetail(response.data)
    })
    .catch(error => console.error("Error fetching coin detail: ", error))
    setLoading(false);
  }, [])

  // also have to show chart
  return (
    <div
      className='flex flex-col w-1/2'
    >
      {!loading && <div>
          <p>{coinDetail.id}</p>
          <p>{coinDetail.name}</p>
          <p>market_cap: {coinDetail.market_data?.current_price.usd}</p>
          <p>market_cap_rank: {coinDetail.market_cap_rank}</p>
          <p>watchlist_portfolio_users: {coinDetail.watchlist_portfolio_users}</p>
          <img src={coinDetail.image?.thumb} alt="" />
          <img src={coinDetail.image?.small} alt="" />
          <img src={coinDetail.image?.large} alt="" />
          {/* <p>Description: {ReactHtmlParser(coinDetail.description?.en.split('. ')[0])}</p> */}
        </div>}
        <AddToWatchList coinId={id} />
    </div>
  )
}

// id
// name
// market_cap_rank
// watchlist_portfolio_users
// sentiment_votes_up_percentage
// sentiment_votes_down_percentage
// image
// links -> homepage, whitepaper, blockchain_site, official_forum_url, chat_url, announcement_url, subreddit_url, repos_url -> github
// description -> en
// block_time_in_minutes
// hashing_algorithm

export default CoinDetail

