import { combineReducers } from "redux";
import currencySlice from "./currencySlice";

const rootReducer = combineReducers({
  currencyReducer: currencySlice.reducer
})

export default rootReducer