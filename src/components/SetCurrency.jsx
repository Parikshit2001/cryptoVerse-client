import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../store/currencySlice';

function SetCurrency() {

  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const selectedOption = useSelector(state => state.currencyReducer.currency);

  const handleChange = async (e) => {
    e.preventDefault();
    dispatch(setData(e.target.value));
  }

  useEffect(() => {
    // const apiUrl = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
    const apiUrl = '/supported_vs_currencies.json'
    axios.get(apiUrl)
    .then(response => {
      setOptions(response.data.data) // for local json
      // setOptions(response.data) // for endpoint
    })
    .catch(error => console.error("Error fetching currency data: ", error))
  }, [])

  return (
    <select 
      value={selectedOption} 
      onChange={handleChange}
      className='rounded p-2 m-2'
    >
      {options?.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default SetCurrency