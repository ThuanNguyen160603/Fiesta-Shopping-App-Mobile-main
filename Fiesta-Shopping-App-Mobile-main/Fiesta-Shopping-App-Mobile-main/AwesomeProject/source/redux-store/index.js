export { addAll, deleteItemInData, deleteManyItemsInData, deleteAll, cartDataSelector, cartChosenDataSelector, onUpdateItemInCartChosenData, onUpdateItemInCartData, deleteItemInChosenData, addItemInChosenData, onChangeCartData } from './Slice/cartSlice'
export {
    isAppKilledSelector,
    setIsAppKilled,
    dataUserSelector,resetUser, isLoginSelector, setIsLogin, setUserData, setEmail, setImage, setName, setAddress,
    addNewAddress, updateAddress,getAddress, setDefaultAddress, setGender, deleteAddress
} from './Slice/userSlice'

export { filterSelector, onChangeName, onChangePriceRange, onChangeMainCategory, onChangeSubCategory, onChangeSort,onReset } from './Slice/filterSlice'

import store from './store'
export { store }