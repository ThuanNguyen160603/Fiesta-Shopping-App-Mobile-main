import { View, Text, Modal, StyleSheet, Alert, TouchableOpacity, TextInput, ToastAndroid, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import CountryFlag from "react-native-country-flag";
import Wrapper from '../../../components/Wrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COUNTRYSTATEAPI } from "@env"
import { commonStyles } from '../../../css/styles/public';
import { MyTextInput } from '../../../components/textinput/AccessComponents';
import { Icon } from 'react-native-vector-icons/Icon';
import regex from '../../../config/Regex';
import { MetarialIcon } from '../../../components/icon/Material';
import styleAddressScreen from './styles';
import Button from '../../../components/Button/Button';
import AxiosInstance from '../../../util/AxiosInstance';
import ShowLoadingDialog from '../../../components/LoadingDialog.js/LoadingDialog';
import { formatText } from '../../../util/CommonFunction';
import Header from '../../../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, dataUserSelector, deleteAddress, getAddress, setDefaultAddress, setUserData, updateAddress } from '../../../redux-store';
import { useTranslation } from 'react-i18next';
const ShippingAddressScreen = () => {
    const userData = useSelector(dataUserSelector)

    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [address, setAddress] = useState(null)
    const [addressData, setAddressData] = useState([])
    const navigation = useNavigation();
    const dispatch = useDispatch()

    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
           display:'none'
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: {
            display:'flex',
            backgroundColor: "white",position: 'absolute', borderTopLeftRadius: 30,
            borderTopRightRadius: 30, height: 70, paddingLeft: 30, paddingRight: 30,
          }
        });
      }, [navigation]);
    const onBack = () => {
        navigation.goBack()
    }
    useEffect(() => {
        if (address)
            setIsOpenUpdate(true)
        return () => {

        }
    }, [address])

    const onSubmitAdd = async (address) => {
        try {
            const addFields = { ...address, isDefault: userData.address.length == 0 }
            const response = await AxiosInstance.post("userApi/addNewAddress", {
                userId: userData._id,
                addFields: addFields
            })
            if (response.result) {
                ToastAndroid.show("ADD NEW ADDRESS SUCCESSFULLY", ToastAndroid.SHORT)
                dispatch(getAddress(response.data.address))
                setIsOpenAdd(false)

            }
        } catch (error) {
            console.log("GET USER ERROR: ", error);

        }
        console.log(JSON.stringify(address));
    }
    const onSubmitUpdate = async (updateTheAddress) => {
        try {
            const { id, ...restAddress } = updateTheAddress
            const response = await AxiosInstance.post("userApi/updateAddress", {
                userId: userData._id,
                updateFields: restAddress,
                addressId: id
            }
            )

            if (response.result) {
                ToastAndroid.show("UPDATE ADDRESS SUCCESSFULLY", ToastAndroid.SHORT)
                
                dispatch(updateAddress({id:id, updateFields: restAddress}))

            }
            setIsOpenUpdate(false)
            setAddress(null)
        } catch (error) {
            console.log("GET USER ERROR: ", error);

        }
    }
    const onDelete = async (id) => {
        try {
            const response = await AxiosInstance.post("userApi/deleteAddress", {
                userId: userData._id,
                addressId: id
            }
            )
            if (response.result) {
                ToastAndroid.show("DELETE ADDRESS SUCCESSFULLY", ToastAndroid.SHORT)
                dispatch(deleteAddress({ id: id }))
            }
            setIsOpenAdd(false)
            setAddress(null)
        } catch (error) {
            console.log("GET USER ERROR: ", error);

        }
    }
    const onSetDefault = async (id) => {
        try {
            console.log(id);
            
            const response = await AxiosInstance.post("userApi/setDefaultAddress", {
                userId: userData._id,
                addressId: id
            }
            )
            if (response.result) {
                ToastAndroid.show("SET DEFAULT ADDRESS SUCCESSFULLY", ToastAndroid.SHORT)
                dispatch(setDefaultAddress({ id: id }))
            }
            setIsOpenAdd(false)
        } catch (error) {
            console.log("GET USER ERROR: ", error);

        }
    }

    const {t} = useTranslation()
    return (
        <Wrapper>
            <Header name={"Shipping Address"} onBack={onBack} />
            <AddAddressModal onSubmitAdd={onSubmitAdd} isOpen={isOpenAdd} onClose={() => setIsOpenAdd(false)} />
            {address && <UpdateAddressModal onClose={() => { setIsOpenUpdate(false); setAddress(null) }} isOpen={isOpenUpdate} onSubmitUpdate={onSubmitUpdate} address={address} />}
            <ScrollView>
                {userData.address.length > 0 ?
                    userData.address.map((item) => {
                        return (
                            <ItemAddress key={item._id} item={item}
                                setAddress={setAddress}
                                onSetDefault={onSetDefault}
                                onDeleteAddress={onDelete}
                            />
                        )
                    })
                    : <View><Text>{t("No address pls add some ...")}</Text></View>
                }
                <TouchableOpacity
                    onPress={() => {
                        if (userData.address.length < 5) {
                            setIsOpenAdd(true); setAddress(null)
                        } else
                            Alert.alert("Warning", "The shipping address list is limited (5 addresses).")
                    }}
                    style={[styleAddressScreen.itemView, { width: '70%', alignSelf: 'center', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                    <MetarialIcon name={"add"} size={21} color={'black'} />
                    <Text style={[commonStyles.normalText, { fontSize: 16, fontWeight: 'bold', color: 'black' }]}>ADD NEW ADDRESS</Text>
                </TouchableOpacity>
             
            </ScrollView>
            {/* <ItemAddress /> */}

        </Wrapper>
    )
}
const AddAddressModal = ({ onClose, isOpen, onSubmitAdd }) => {

    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [stateName, setStateName] = useState(null);
    const [cityName, setCityName] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [street, setStreet] = useState("")
    const [houseNumber, setHouseNumber] = useState("")
    const validate = () => {
        if (!countryName || !stateName || !cityName || !street || !houseNumber || !name || !phoneNumber) {
            Alert.alert("Warning", "You must fill in all fields.")
            return false
        }
        if (!regex.fullnameWithRegex.test(name)) {
            Alert.alert("Warning", "Name: Each word must has a Uppercase at first char and has space between them.\n(At least two words...)")
            return false
        }
        if (!regex.phoneNumber.test(phoneNumber)) {
            Alert.alert("Warning", "It's not phone number.")
            return false
        }
        return true
    }
    const{t} =useTranslation()
    const onReset = () => {
        setCountry(null)
        setCountryName(null)
        setName("")
        setPhoneNumber("")
        setStreet("")
        setHouseNumber("")
        setState(null)
        setStateName(null)
        setCity(null)
        setCityName(null)

    }
    const handleState = async (countryCode) => {
        var headers = new Headers();

        headers.append("X-CSCAPI-KEY", COUNTRYSTATEAPI);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        try {
            await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    const states = JSON.parse(result)
                    var count = states.length;
                    let stateArray = [];
                    for (var i = 0; i < count; i++) {
                        stateArray.push({
                            "value": states[i].iso2,
                            "label": states[i].name,
                        });

                    }
                    console.log(states);

                    setStateData(stateArray);
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log("Get country error: ", error);

        }
    };

    const handleCity = async (countryCode, stateCode) => {
        var headers = new Headers();

        headers.append("X-CSCAPI-KEY", COUNTRYSTATEAPI);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        try {
            await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    const cities = JSON.parse(result)
                    var count = cities.length;
                    let cityArray = [];
                    for (var i = 0; i < count; i++) {
                        cityArray.push({
                            "value": cities[i].id,
                            "label": cities[i].name,
                        });

                    }

                    setCityData(cityArray);
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log("Get country error: ", error);

        }
    };

    const getCountryList = async (Ciso) => {
        var headers = new Headers();

        headers.append("X-CSCAPI-KEY", COUNTRYSTATEAPI);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        let params = ""
        try {
            await fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const countries = JSON.parse(result)
                    var count = countries.length;
                    let countryArray = [];
                    for (var i = 0; i < count; i++) {
                        countryArray.push({
                            "value": countries[i].iso2,
                            "label": countries[i].name,
                        });

                    }

                    setCountryData(countryArray);
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log("Get country error: ", error);

        }

    }
    const getList = async () => {
        try {
            const countryList = await AsyncStorage.getItem("countries")
            if (countryList) {
                setCountryData(JSON.parse(countryList))
               
            }
            else
                getCountryList()
        } catch (error) {
            console.log("Error get list: ", error);

        }
    }
    const asyncCleanup = async () => {
        const countries = await AsyncStorage.getItem("countries")
        if (countries && countryData.length > 0) {
            await AsyncStorage.setItem("countries", JSON.stringify(countryData));
        }
    };
    useEffect(() => {
        if (isOpen)
            getList();
      
        return () => {
            asyncCleanup()
            onReset()
           
        }
    }, [isOpen])

    return (
        <Modal
            onRequestClose={onClose}
            visible={isOpen}
        >
            <Wrapper>
                <View>
                    <View style={{ height: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View />
                        <Text style={[commonStyles.normalText, styleAddressScreen.tilteModal,]}>ADD NEW ADDRESS</Text>
                        <TouchableOpacity style={styleAddressScreen.cancel}
                            onPress={() => onClose()}
                        >
                            <MetarialIcon name='cancel' color='black' size={30} />

                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder={t("address-name-placeholder")}
                        onChangeText={setName}
                        style={styleAddressScreen.textInput}
                        value={name}
                    />
                    <TextInput
                        placeholder={t("phone-number-placeholder")}
                        onChangeText={setPhoneNumber}
                        style={styleAddressScreen.textInput}
                        value={phoneNumber}

                    />

                    {countryData &&
                        <Dropdown
                            renderItem={(item, selected) => {
                                return (
                                    <View style={{ flexDirection: 'row', margin: 10 }}>
                                        <CountryFlag
                                            isoCode={item.value}
                                            size={30}
                                            style={{ marginRight: 12 }}
                                        />
                                        <Text style={[commonStyles.normalText, {}]}>
                                            {item.label}
                                        </Text>
                                    </View>
                                )
                            }}
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={countryData}
                            search

                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? t("Select country") : '...'}
                            searchPlaceholder={`${t("Search")}...`}
                            value={country}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {

                                setCountry(item.value);
                                handleState(item.value);
                                setCountryName(item.label);
                                setIsFocus(false);
                            }}
                        />}
                    <Dropdown

                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={stateData}
                        search

                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? t('Select state') : '...'}
                        searchPlaceholder={`${t("Search")}...`}
                        value={state}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {

                            setState(item.value);
                            handleCity(country, item.value);
                            setStateName(item.label);
                            setIsFocus(false);
                        }}
                    />
                    <Dropdown

                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={cityData}
                        search

                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? t('Select city') : '...'}
                        searchPlaceholder={`${t("Search")}...`}
                        value={state}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {


                            setCityName(item.label);
                            setIsFocus(false);
                        }}
                    />
                    <TextInput
                        placeholder={t("street-name-placeholder")}
                        onChangeText={setStreet}
                        style={styleAddressScreen.textInput}
                        value={street}
                    />
                    <TextInput
                        placeholder={t("house-number-placeholder")}
                        onChangeText={setHouseNumber}
                        style={styleAddressScreen.textInput}
                        value={houseNumber}

                    />

                    <Button
                        onPress={() => {
                            if (validate())
                                onSubmitAdd({
                                    name: name,
                                    country: countryName,
                                    city: stateName,
                                    ward: cityName,
                                    street: street,
                                    houseNumber: houseNumber,
                                    phoneNumber: phoneNumber
                                })

                        }}
                        title={t("Submit")}
                        styleButton={{ backgroundColor: 'black' }}
                        styleText={{ color: 'white' }}
                    />
                    <Button
                        onPress={() => onReset()}
                        title={t("Reset")}
                        styleButton={{ backgroundColor: '#dcdcdc' }}
                        styleText={{ color: 'black' }}
                    />
                </View>
            </Wrapper>

        </Modal>
    )
}
const UpdateAddressModal = ({ onClose, isOpen, onSubmitUpdate, address }) => {

    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [countryName, setCountryName] = useState(address.country);
    const [stateName, setStateName] = useState(address.city);
    const [cityName, setCityName] = useState(address.ward);
    const [isFocus, setIsFocus] = useState(false);

    const [name, setName] = useState(address.name)
    const [phoneNumber, setPhoneNumber] = useState(address.phoneNumber)
    const [street, setStreet] = useState(address.street)
    const [houseNumber, setHouseNumber] = useState(address.houseNumber)
    const validate = () => {
        console.log(countryName , stateName , cityName , street , houseNumber , name , phoneNumber);
        
        if (!countryName || !stateName || !cityName || !street || !houseNumber || !name || !phoneNumber) {
            Alert.alert("Warning", "You must fill in all fields.")
            return false
        }
        if (!regex.fullnameWithRegex.test(name)) {
            Alert.alert("Warning", "Name: Each word must has a Uppercase at first char and has space between them.\n(At least two words...)")
            return false
        }
        if (!regex.phoneNumber.test(phoneNumber)) {
            Alert.alert("Warning", "It's not phone number.")
            return false
        }
        return true
    }

    const onReset = () => {
        setCountry(null)
        setCountryName(null)
        setName("")
        setPhoneNumber("")
        setStreet("")
        setHouseNumber("")
        setState(null)
        setStateName(null)
        setCity(null)
        setCityName(null)

    }
    const handleState = async (countryCode) => {
        var headers = new Headers();

        headers.append("X-CSCAPI-KEY", COUNTRYSTATEAPI);
        let state = null
        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        try {
            await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    const states = JSON.parse(result)
                    var count = states.length;
                    let stateArray = [];
                    for (var i = 0; i < count; i++) {
                        stateArray.push({
                            "value": states[i].iso2,
                            "label": states[i].name,
                        });

                    }
                    state = stateArray
                    setStateData(stateArray);
                })
                .catch(error => console.log('error', error));
            return state;
        } catch (error) {
            console.log("Get country error: ", error);

        }
    };

    const handleCity = async (countryCode, stateCode) => {
        var headers = new Headers();

        headers.append("X-CSCAPI-KEY", COUNTRYSTATEAPI);
        let city = null
        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        try {
            await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    const cities = JSON.parse(result)
                    var count = cities.length;
                    let cityArray = [];
                    for (var i = 0; i < count; i++) {
                        cityArray.push({
                            "value": cities[i].id,
                            "label": cities[i].name,
                        });

                    }
                    city = cityArray
                    setCityData(cityArray);
                })
                .catch(error => console.log('error???', error));
            return city
        } catch (error) {
            console.log("Get country error: ", error);

        }
    };

    const getCountryList = async (Ciso) => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", COUNTRYSTATEAPI);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        try {
            await fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const countries = JSON.parse(result)
                    var count = countries.length;
                    let countryArray = [];
                    for (var i = 0; i < count; i++) {
                        countryArray.push({
                            "value": countries[i].iso2,
                            "label": countries[i].name,
                        });

                    }
                 
                    setCountryData(countryArray);
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log("Get country error: ", error);

        }

    }
    const fillInAddress = async () => {


        if (countryData.length > 0) {
            // find if country available
            const availableCountry = countryData.find((value, index) => {

                return value.label == address.country
            })
            setCountryName(availableCountry.label)

            setCountry(availableCountry.value)
            let state = await handleState(availableCountry.value)
            const availableState = state.find((value, index) => {

                return value.label == address.city
            })
            setStateName(availableState.label)
            setState(availableState.value)

            let city = await handleCity(availableCountry.value, availableState.value)
            const availableCity = city.find((value, index) => {

                return value.label == address.ward
            })
            setCityName(availableCity.label)

            setCity(availableCity.value)

        }
    }
    useEffect(() => {
        // Fill the available address in update
        if (countryData)
            fillInAddress()
      
        return () => {
            
        }
    }, [countryData])

    const getList = async () => {
        try {
            setName(address.name||"")
            setPhoneNumber(address.phoneNumber||"")
            setStreet(address.street||"")
            setHouseNumber(address.houseNumber||"")
            const countryList = await AsyncStorage.getItem("countries")
            
            if (countryList) {
                setCountryData(JSON.parse(countryList))
              

            }
            else
                getCountryList()
        } catch (error) {
            console.log("Error get list: ", error);

        }
    }
    const asyncCleanup = async () => {
        const countries = await AsyncStorage.getItem("countries")

        if (countries==null || countryData.length > 0) {
            const result =await AsyncStorage.setItem("countries", JSON.stringify(countryData));
        }
    };
    useEffect(() => {
        if (isOpen)
            getList();
      
            
        return () => {
            asyncCleanup()
            onReset()
            
        }
    }, [isOpen])
    const {t}=useTranslation()
    return (
        <Modal
            onRequestClose={onClose}
            visible={isOpen}
        >
            <Wrapper>
                <View>
                    <View style={{ height: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View />
                        <Text style={[commonStyles.normalText, styleAddressScreen.tilteModal,]}>{t("UPDATE THE ADDRESS")}</Text>
                        <TouchableOpacity style={styleAddressScreen.cancel}
                            onPress={() => onClose()}
                        >
                            <MetarialIcon name='cancel' color='black' size={30} />

                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder={t("address-name-placeholder")}
                        onChangeText={setName}
                        style={styleAddressScreen.textInput}
                        value={name}
                    />
                    <TextInput
                        placeholder={t("phone-number-placeholder")}
                        onChangeText={setPhoneNumber}
                        style={styleAddressScreen.textInput}
                        value={phoneNumber}

                    />

                    {countryData &&
                        <Dropdown
                            renderItem={(item, selected) => {
                                return (
                                    <View style={{ flexDirection: 'row', margin: 10 }}>
                                        <CountryFlag
                                            isoCode={item.value}
                                            size={30}
                                            style={{ marginRight: 12 }}
                                        />
                                        <Text style={[commonStyles.normalText, {}]}>
                                            {item.label}
                                        </Text>
                                    </View>
                                )
                            }}
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={countryData}
                            search

                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? t('Select country') : '...'}
                            searchPlaceholder={`${t("Search")}...`}
                            value={country}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {

                                setCountry(item.value);
                                handleState(item.value);
                                setCountryName(item.label);
                                setIsFocus(false);
                            }}
                        />}
                    <Dropdown

                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={stateData}
                        search

                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? t('Select state') : '...'}
                        searchPlaceholder={`${t("Search")}...`}
                        value={state}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {

                            setState(item.value);
                            handleCity(country, item.value);
                            setStateName(item.label);
                            setIsFocus(false);
                        }}
                    />
                    <Dropdown

                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={cityData}
                        search

                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? t('Select city') : '...'}
                        searchPlaceholder={`${t("Search")}...`}
                        value={city}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {


                            setCityName(item.label);
                            setIsFocus(false);
                        }}
                    />
                    <TextInput
                        placeholder={t('street-name-placeholder')}
                        onChangeText={setStreet}
                        style={styleAddressScreen.textInput}
                        value={street}
                    />
                    <TextInput
                        placeholder={t('house-number-placeholder')}
                        onChangeText={setHouseNumber}
                        style={styleAddressScreen.textInput}
                        value={houseNumber}

                    />

                    <Button
                        onPress={() => {
                            if (validate()){
                                const updateAddress ={
                                    id: address._id,
                                    name: name,
                                    country: countryName,
                                    city: stateName,
                                    ward: cityName,
                                    street: street,
                                    houseNumber: houseNumber,
                                    phoneNumber: phoneNumber,
                                    isDefault: address.isDefault
                                } 
                                
                                onSubmitUpdate(updateAddress)
                            }
                              

                        }}
                        title={t("Submit")}
                        styleButton={{ backgroundColor: 'black' }}
                        styleText={{ color: 'white' }}
                    />

                </View>
            </Wrapper>

        </Modal>
    )
}
export const ItemAddress = ({ item, setAddress, onDeleteAddress, onSetDefault }) => {
    const [itemAddress, SetItemAddress] = useState(item)
   
    
    useEffect(() => {
        if (item)
            SetItemAddress(item)


    }, [item])


    return (

        <TouchableOpacity
           
            activeOpacity={0.8}
            onPress={() => onSetDefault(item._id)
            }
            style={[styleAddressScreen.itemView, itemAddress.isDefault ? { zIndex: 0, borderColor: 'black', borderWidth: 5 } : {}]}>
            {
                itemAddress.isDefault && <View style={{ position: 'absolute', top: -5, right: -5, zIndex: 21, backgroundColor: 'black', padding: 1, borderTopLeftRadius: 8, borderBottomLeftRadius: 5 }}>
                    <MetarialIcon name={"check"} size={20} color={'white'}
                    />
                </View>
            }
            <Text style={[commonStyles.normalText, { fontSize: 20, fontWeight: 'bold', color: 'black' }]}>{itemAddress.name}</Text>
            <Text style={[commonStyles.normalText, { fontSize: 18, color: 'black' }]}>{itemAddress.phoneNumber}</Text>
            <Text>
                {formatText(
                    `${itemAddress.houseNumber} ${itemAddress.street}, ${itemAddress.ward}, ${itemAddress.city}, ${itemAddress.country}`,
                    100, 1
                )}</Text>
            <View style={{ alignSelf: 'flex-end', marginTop: 6, flexDirection: 'row', alignItems: 'center', width: '20%', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => setAddress(item)}>
                    <MetarialIcon name={"edit"} size={20} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDeleteAddress(item._id)}>
                    <MetarialIcon name={"delete"} size={20} color={"red"} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>


    )
}

export default ShippingAddressScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#533483',
        padding: 16,
        justifyContent: 'center',
        alignContent: 'center',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});