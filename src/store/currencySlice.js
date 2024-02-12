import { createSlice } from "@reduxjs/toolkit"

const data = JSON.parse(localStorage.getItem('currency'));

const initialState = {
  currency: data != undefined ? data : 'usd'
}

const currencySlice = createSlice({
  name: "currencySelected",
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      localStorage.setItem('currency', JSON.stringify(action.payload))
      state.currency = action.payload
    }
  }
})

export const {setData} = currencySlice.actions

export default currencySlice