import { combineReducers } from "redux";
import userReducer from './Slice/userSlice'
import cartReducer from './Slice/cartSlice'
import filterReducer from './Slice/filterSlice'
const rootReducer = combineReducers({
    userReducer:userReducer,
    cartReducer:cartReducer,
    filterReducer:filterReducer
})
export default rootReducer;