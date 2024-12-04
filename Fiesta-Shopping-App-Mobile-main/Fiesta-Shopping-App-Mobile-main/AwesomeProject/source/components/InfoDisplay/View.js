import { View, Text,TextInput } from 'react-native'
import React, { useContext } from 'react'
import { AppStyles } from '../../css/styles/CommonStyles'
import { commonStyles } from '../../css/styles/CommonStyles'
import { POPPINS_FONT } from '../../css/theme/Theme'
import { color } from '../../config/ThemeAction'
import { AppContext } from '../../util/AppContext'

export const InfoDisplayWithLabel = ({label, info, onChangeText,...textInputprops}) => {
   const {theme} = useContext(AppContext)
    return (
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:5}}>
            <Text style={{fontFamily: POPPINS_FONT.medium, fontSize:16, opacity:0.7,color:theme.secondary}}>{label}</Text>
            <View style={{borderBottomWidth:0.5, width:'68%', borderColor:'#b4b3b3'}}>
                <TextInput {...textInputprops} defaultValue={info}onChangeText={onChangeText}style={[commonStyles.normalText,{backgroundColor:theme,color:theme.secondary, marginTop:5, paddingLeft:12, fontSize:16}]}>
                    
                </TextInput>
            </View>
        </View>
    )
}
