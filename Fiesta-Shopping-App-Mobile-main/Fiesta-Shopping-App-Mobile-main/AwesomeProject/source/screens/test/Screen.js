import { View, Text, TouchableOpacity, Switch } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { FlashList } from "@shopify/flash-list";
import { color, getMode, setMode } from '../../config/ThemeAction';
import { ThemeContext } from '../../util/ThemeProvider';
import { AppContext } from '../../util/AppContext';
import ProductList1 from '../../components/ProductList/ProductList1';
import SearchScreen from '../ProductSearch/SearchModal';
import AxiosInstance from '../../util/AxiosInstance';

const TestScreen = () => {
  const {theme} = useContext(AppContext)
  // const [darkMode,setDarkMode] = useState(false)

  const onTestToken = async ()=>{
    try {
        const response = await AxiosInstance.post("userApi/testAuthen")
        if(response.result)
          console.log(response.message);
        
    } catch (error) {
      console.log("onTestToken: ",error);
      
    }
  }
  return (
 <View>
  <TouchableOpacity
  onPress={()=>onTestToken()}
  >
    <Text>Tesstttt</Text>
  </TouchableOpacity>
 </View>

  );
}

export default TestScreen