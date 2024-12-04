import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Wrapper from '../../components/Wrapper'; 
import { styleCoProdScreen } from './Styles';
import ProductList1 from '../../components/ProductList/ProductList1';
const CategoryofProdScreen = () => {
  const Header=(props)=>{


    return(
      <View>
        <View style={styleCoProdScreen.header}>
      
      <TouchableOpacity onPress={()=>console.log("back")}>
      <Icon name="arrow-back-circle" color={"black"} size={50}/>

      </TouchableOpacity>
      <TouchableOpacity onPress={()=>console.log("search")}>
      <Icon name="search-circle-outline" color={"black"} size={40}/>

      </TouchableOpacity >
      </View>
      <Text style={[styleCoProdScreen.title,{}]}>Bags</Text>
      </View>
    )
  }
  return (
    <Wrapper>
      <ProductList1 
      header={Header}
      // data={}
      />
    
    </Wrapper>

  )
}
const data=[{
  images:'',
  author:'',
  name:'',
  prices:1000,
}]
export default CategoryofProdScreen