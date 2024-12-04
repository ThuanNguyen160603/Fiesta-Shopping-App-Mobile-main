import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLogin: false,
    isAppKilled: true,
    dataUser: {
        _id:"",
        name: "",
        image: null,
        phoneNumber: "",
        userName: "",
        gender: "",
        address: []
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setIsLogin: (state, action) => {
            state.isLogin = action.payload
        },
        setIsAppKilled: (state, action) => {
            state.isAppKilled = action.payload
        },
        setUserData: (state, action) => {
            state.dataUser = action.payload;
        },
        resetUser: (state, action) => {
            state.dataUser = {
                _id:"",
                name: "",
                image: null,
                phoneNumber: "",
                userName: "",
                gender: "",
                address: []
            };
        },
        // set each òf values in dataUSer
        setEmail: (state, action) => {
            state.dataUser.userName = action.payload;
        },
        setImage: (state, action) => {
            state.dataUser.image = action.payload;
        },
        setName: (state, action) => {
            state.dataUser.name = action.payload;
        },
        // setImage: (state, action) => {
        //     state.dataUser.avatar = action.payload;
        // },
        setPhoneNumber: (state, action) => {
            state.dataUser.phoneNumber = action.payload;
        },
        setGender: (state, action) => {
            state.dataUser.gender = action.payload;
        },
        //Address
        getAddress: (state, action) => {
            const newAddresses = action.payload
            state.dataUser.address=newAddresses
        },
        addNewAddress: (state, action) => {
            const newAddress = action.payload
            state.dataUser.address.push(newAddress)
        },
        updateAddress: (state, action) => {
            const { id, updateFields } = action.payload
            const newAddress = state.dataUser.address.map((item, index) => {
                if (id == item._id)
                    return { ...item, ...updateFields }

                return item
            })
            console.log("UPDATE ADDRESS: ", newAddress);

            state.dataUser.address = newAddress
        },
        deleteAddress: (state, action) => {
            const { id } = action.payload
            const newAddress = state.dataUser.address.filter((item, index) => {
                return !(id == item._id)
            })
            console.log("DELETE ADDRESS: ", newAddress);

            state.dataUser.address = newAddress
        },
        setDefaultAddress: (state, action) => {
            const { id } = action.payload
            const newAddress = state.dataUser.address.map((item, index) => {
                return { ...item, isDefault: item._id == id }
            })

            state.dataUser.address = newAddress
        },
        setAddress: (state, action) => {
            state.dataUser.address = action.payload;
        }
    }
})
export const { setIsLogin, setIsAppKilled,resetUser, setUserData, setEmail, setImage, setName, setAddress, addNewAddress,getAddress, updateAddress, setDefaultAddress, setGender, deleteAddress } = userSlice.actions

export const dataUserSelector = (state) => state.userReducer.dataUser
export const isLoginSelector = (state) => state.userReducer.isLogin
export const isAppKilledSelector = (state) => state.userReducer.isAppKilled

export default userSlice.reducer;