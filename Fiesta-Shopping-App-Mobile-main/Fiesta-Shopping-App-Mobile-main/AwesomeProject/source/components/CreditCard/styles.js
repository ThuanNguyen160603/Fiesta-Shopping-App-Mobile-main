import { StyleSheet } from "react-native"
import { POPPINS_FONT } from "../../css/theme/Theme"
import { Dimensions } from "react-native"
const {width} = Dimensions.get('screen')
export const CardStyles = StyleSheet.create({
    CardViewStyle:{
        height:200,
        width:370,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,

    },accountNumStyle:{
        color:'white',
        fontFamily:POPPINS_FONT.semibold,
        
        fontSize:19
    },
    nameStyle:{
        color:'white',
        fontFamily:POPPINS_FONT.semibold,
        fontSize:19
    },
    expiredDateStyle:{
        color:'white',
        fontFamily:POPPINS_FONT.semibold,
        position:'absolute',
        bottom:10,right:130
    },textStyle:{
        justifyContent:'center',
        alignSelf:'center',
    },cardBack:{
        flexDirection:'row',
      
    },
    lineCardBack:{
        width:370,
        height:50,
        opacity:0.4
    }

})
