import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../util/AppContext'
// import PropTy
const Wrapper = ({children,style}) => {
  // const {style}=props;
  const {theme} = useContext(AppContext)
  return (
    <View style={[{paddingHorizontal:15,backgroundColor:'white', height:'100%'},style]}>
      {children}
    </View>
  )
}

export default Wrapper