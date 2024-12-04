import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import  {AppContext}  from '../../util/AppContext'
import { POPPINS_FONT } from '../../css/theme/Theme'

const Button = ({title,styleButton,styleText,...touchableOpacityProps}) => {
    const {theme}= useContext(AppContext)
  return (
    <TouchableOpacity 
    activeOpacity={0.6} 
    
    {...touchableOpacityProps}
    style={[{
        borderWidth: 1,
        borderColor: theme.tertiary,
        borderRadius: 30,
        width:350,
        marginTop:20,
        alignSelf:'center',
    
    },styleButton]}
    

    >
      <Text 
      style={[{
        textAlign: 'center',
        fontFamily: POPPINS_FONT.bold,
        padding: 8,
        color: theme.secondary,
        fontSize:17,
        marginTop:4     
      },styleText]}
     
      >{title??"Button"}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})