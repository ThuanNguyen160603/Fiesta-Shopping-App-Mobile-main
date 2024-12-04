import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { POPPINS_FONT } from '../../theme/Theme'
export const StyleOrderScreen = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },
    cardViewShadow: {
        padding: 20, 
        marginTop: 30, 
        borderRadius: 10, 
        backgroundColor: 'white',
        shadowColor: '#020202',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8
    },
    textLocation: {
        fontFamily: POPPINS_FONT.bold,
        color: 'black',
        fontSize: 15,
        marginTop: -4
    },
    textIdOrder: {
        fontFamily: POPPINS_FONT.bold,
        color: 'black',
        fontSize: 17
    },
    viewSearchBar: {
        marginTop: 30,
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
    }
})
