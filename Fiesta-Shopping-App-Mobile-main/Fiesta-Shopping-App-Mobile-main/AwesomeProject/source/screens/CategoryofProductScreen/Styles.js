import { StyleSheet } from "react-native";
import { FONTS } from "../../assets/Constants";
const  styleCoProdScreen=StyleSheet.create({
    header:{
        marginVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        // backgroundColor:'red',
        alignItems:'center'
    },title:{
        fontFamily:FONTS.POPPINS_EXTRA_BOLD,
        fontSize:20,
        color:'black',
        marginLeft:8,
        marginVertical:10
    }
})
export {styleCoProdScreen}
