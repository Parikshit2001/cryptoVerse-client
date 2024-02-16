import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { CoinDetail, CoinMarketData, HomePage, Login, SignUp, WatchListMarketData } from './pages'
import { Header } from './components'
import axios from 'axios'
import { server } from './constants'

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
    axios.get(`${server}/api/v1/users/loginstatus`, {withCredentials: true})
    .then(() => {
      setLoginStatus(true);
    })
    .catch(error => {
      console.error("User not logged in: ", error)
      setLoginStatus(false);
    })
  }, [location.pathname])

  return (
    <div className='flex flex-col items-center bg-blue-100 min-h-screen'>
      {loginStatus && <Header />}
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/coin-market-data' element={<CoinMarketData />}/>
        <Route path='/coin-detail/:id' element={<CoinDetail />}/>
        <Route path='/watchlist-market-data' element={<WatchListMarketData />}/>
      </Routes>
    </div>
  )
}

export default App