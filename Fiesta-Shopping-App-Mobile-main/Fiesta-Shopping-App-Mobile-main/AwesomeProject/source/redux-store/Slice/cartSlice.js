import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
    cartData: [],
    cartChosenData: []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //DATA
        onUpdateItemInCartData: (state, action) => {
            const { id, quantity, isStockSufficient } = action.payload
            const updatedData = state.cartData.map((item, index) => {
                let newItem = { ...item }

                if (item._id === id &&typeof isStockSufficient!=='undefined') {
                    
                    newItem = { ...newItem, isStockSufficient: isStockSufficient };
                }
                if (item._id === id) {
                    newItem = { ...newItem, quantity: quantity };
                }
                return newItem;
            })
            state.cartData = updatedData
        },
       
        deleteItemInData: (state, action) => {
            const id = action.payload;
            state.cartData = state.cartData.filter((item) => item._id !== id);
            
        },
        deleteManyItemsInData: (state, action) => {
            const cartIds = action.payload
            const set = new Set(cartIds)
            state.cartData = state.cartData.filter((item) => { return !set.has(item._id) })
            
        },
        onChangeCartData: (state, action) => {
            state.cartData = action.payload
        },

        // CHOSEN DATA
        onUpdateItemInCartChosenData: (state, action) => {
            const { id, quantity } = action.payload
            const updatedData = state.cartChosenData.map((item, index) => {
                if (item._id === id) {
                    return { ...item, quantity: quantity };
                }
                return item;
            })
            state.cartChosenData = updatedData
            console.log("onUpdateItemInCartChosenData",);
        },
        addItemInChosenData: (state, action) => {
            const item = action.payload
            const ids = state.cartChosenData.map(item=>item._id)
            const set = new Set(ids)
           
            if(!set.has(item._id))
             state.cartChosenData.push(item)
        },
        addAll: (state, action) => {
            state.cartChosenData = state.cartData.slice(0,19)
        },
        deleteItemInChosenData: (state, action) => {
            const id = action.payload
            state.cartChosenData = state.cartChosenData.filter((item) => { return item._id !== id })
        },
        deleteManyItemInChosenData: (state, action) => {
            const id = action.payload
            state.cartChosenData = state.cartChosenData.filter((item) => { return item._id !== id })
        },
        deleteAll: (state, action) => {
            state.cartChosenData = []
        }
    }
})


export const { deleteManyItemsInData, onUpdateItemInCartChosenData,addAll, deleteItemInData, deleteAll, onUpdateItemInCartData, deleteItemInChosenData, addItemInChosenData, onChangeCartData } = cartSlice.actions
export const cartChosenDataSelector = (state) => state.cartReducer.cartChosenData
export const cartDataSelector = (state) => state.cartReducer.cartData
export default cartSlice.reducer