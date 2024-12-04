import { StyleSheet } from "react-native";
const  dialogStyle=StyleSheet.create({
    modal:{
        borderRadius:30 ,
        padding:20,
        alignSelf:'center',
        marginTop:200,

    },
    title:{
        fontSize:23,
        fontWeight:'bold',
        color:'black',textAlign:'center'
    },
    button:{
        width:250,
        alignSelf:'center'
    },
    message:{
        marginHorizontal:20,
        marginTop:10
    },
    image:{
        alignSelf:'center',
        height:100,
        width:200,
    }
})
export default dialogStyle;