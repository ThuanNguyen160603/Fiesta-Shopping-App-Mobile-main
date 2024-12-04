import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { POPPINS_FONT } from '../theme/Theme'
export const StylePublic = StyleSheet.create({
    shadow:{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 10, // changed to a greater value
        // borderRadius: 100,
        zIndex: 99, // added zIndex
        backgroundColor:'#fefefe'
    },
    card:{
        padding:12,
        margin:10,
        borderRadius:10,
        elevation:10,
     },
     horizonLine:{
        borderBottomWidth:0.5,
        borderColor:'#dbdbdb'
    }
})

export const commonStyles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    normalText: {
        padding: 2,
        fontSize: 15,
        fontFamily: POPPINS_FONT.regular
    },
    title: {
        fontSize: 40,
        fontFamily: POPPINS_FONT.bold,
        padding: 2,
        color: 'white'
    },
    btnAccess_light: {
        borderRadius: 30,
        backgroundColor: '#ffffff',
        width:350
    },
    btnAccess_dark: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 30,
        width:350,
        marginTop:20
    },
    textBtnAccess_light: {
        textAlign: 'center',
        fontFamily: POPPINS_FONT.bold,
        padding: 7,
        color: 'black',
        fontSize:17
    },
    textBtnAccess_dark: {
        textAlign: 'center',
        fontFamily: POPPINS_FONT.bold,
        padding: 7,
        color: 'white',
        fontSize:17
    },
    viewBtnAccess: {
        flexDirection:'column',
        alignItems:'stretch'
    }
})



