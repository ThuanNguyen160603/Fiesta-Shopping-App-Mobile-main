import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { POPPINS_FONT } from "../../css/theme/Theme";

const StyleProfile=StyleSheet.create({
    card:{
       flexDirection:'column',
       padding:12,
       margin:10,
       
       borderRadius:10,
       elevation:10,
    },
    Para:{
        justifyContent:'center',
        paddingLeft:20
    },
    boldText:{
        fontFamily:POPPINS_FONT.bold,
        fontSize:23,
        color:'black',
    },
    regularText:{
        fontFamily:POPPINS_FONT.regular,
        fontSize:15,
    },
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
    image:{
        width:80,
        height:80,
        borderRadius:10
    },

    // USER ACCESS

    item:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:8
    },
    miniItem:{
        width:'93%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    iconWrapper:{
       backgroundColor:'#cccccc',
       padding:10,
       borderRadius:15 
    },


})
export default StyleProfile;