import React, { useContext } from "react";
import { POPPINS_FONT } from "../theme/Theme";
import { StyleSheet } from "react-native";
import { styleUserAccess } from "./screens/StyleUserAccess";
import { StyleLogin } from "./screens/StyleLogin";
import { StyleSignUp } from "./screens/StyleSignUp";
import { StyleSearchScreen } from "./screens/StyleSearchScreen";
import { StyleOrderScreen } from "./screens/StyleOrderScreen";
import { StyleHome } from "./screens/StyleHome";
import { StyleChatDashboard } from "./screens/StyleChatDashboard";


export const commonStyles = StyleSheet.create({
 
    normalText: {
        fontSize: 15,
        fontFamily: POPPINS_FONT.regular,
        color:'black'
    },
    title: {
        fontSize: 40,
        fontFamily: POPPINS_FONT.bold,
        color: 'white'
    },
 
    viewBtnAccess: {
        flexDirection:'column',
        alignItems:'stretch'
    },
    section : {
        fontFamily: POPPINS_FONT.bold,
        fontSize:18,
        color:'black'
    }
})

export const AppStyles = {
    styleUserAccess,
    StyleLogin,
    StyleSignUp,
    StyleSearchScreen,
    StyleOrderScreen,
    StyleHome,
    StyleChatDashboard
}