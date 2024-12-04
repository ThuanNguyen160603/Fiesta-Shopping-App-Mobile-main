import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


export const StyleHome = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        justifyContent: 'space-between'
    },
    viewSearchBar: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    touchCapture: {
        backgroundColor: 'black',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 27.5
    },
    cardViewShadow: {
        padding: 12, 
        marginTop: 30, 
        borderRadius: 15, 
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 15, flexDirection:'row', justifyContent:'space-between', alignItems: 'center'
    }
})

