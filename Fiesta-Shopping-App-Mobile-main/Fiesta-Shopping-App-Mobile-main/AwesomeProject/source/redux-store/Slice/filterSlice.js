import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    filter: {
        name: "",
        priceRange: {
            min: 0,
            max: 100000
        },
        category: {
            mainCategory: "",
            subCategory: []
        },
        sortBy: "",
        sortOrder: ""
    }
}
const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        onChangeName: (state, action) => {
            const name = action.payload

            state.filter.name = name
        },
        onChangePriceRange: (state, action) => {
            const values = action.payload
            if (Array.isArray(values) && values) {
                state.filter.priceRange.max = values[1]
                state.filter.priceRange.min = values[0]
            }
        },
        onChangeMainCategory: (state, action) => {
            const mainCategory = action.payload
            state.filter.category.mainCategory = mainCategory
        },
        onChangeSubCategory: (state, action) => {
            const subCategory = action.payload
            state.filter.category.subCategory = [subCategory]
        },
        onChangeSort: (state, action) => {
            if (action.payload == null) {
                state.filter.sortBy = ""
                state.filter.sortOrder = ""
                return
            }
            const { sortBy, sortOrder } = action.payload
            if (sortBy && sortOrder) {
                state.filter.sortBy = sortBy
                state.filter.sortOrder = sortOrder
            }
        },
        onReset: (state, action) => {
            state.filter = {
                name: "",
                priceRange: {
                    min: 0,
                    max: 100000
                },
                category: {
                    mainCategory: "",
                    subCategory: []
                },
                sortBy: "",
                sortOrder: ""
            }
        }
    }
})

export const {onReset, onChangeName, onChangePriceRange, onChangeMainCategory, onChangeSubCategory, onChangeSort } = filterSlice.actions;
export default filterSlice.reducer
export const filterSelector = (state) => state.filterReducer