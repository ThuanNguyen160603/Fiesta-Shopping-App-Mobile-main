import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


export const StyleSettingScreen = StyleSheet.create({
    viewMenu: {
        paddingLeft: 20,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 22,
        paddingTop: 15,
        paddingBottom: 20,
        
        marginTop:11,
  
    },
    viewOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:10
    },
    viewTitle: {
        flexDirection: 'row', alignItems: 'center', width: '60%'
    },
    viewStatus: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '25%'
    },
    viewIcon: {
         padding: 7, borderRadius: 8, marginRight: 20, width:40, height:40, alignItems:'center', justifyContent:'center'
    }
})
