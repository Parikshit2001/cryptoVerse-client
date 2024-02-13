import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CoinDetail, CoinMarketData, HomePage, Login, SignUp, WatchListMarketData } from './pages'
import { Header } from './components'

function App() {
  return (
    <div className='flex flex-col items-center bg-blue-100 min-h-screen'>
      <Header />
      
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