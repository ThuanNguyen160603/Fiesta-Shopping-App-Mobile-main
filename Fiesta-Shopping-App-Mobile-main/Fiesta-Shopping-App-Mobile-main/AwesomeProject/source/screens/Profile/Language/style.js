import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const {width} =Dimensions.get('screen')
const styleModalLanguage = StyleSheet.create({
    Icon:{
        alignSelf:'flex-end',
        margin:5
    },
    modal:{
        padding:10,
        margin:20,
        backgroundColor:'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        width:width-20*2,height:330,
        borderRadius:15
    },
    cardLanguage:{
        marginVertical:5,
       alignSelf:'center',
        flexDirection:'row',
        width:360,
        height:80,
        borderWidth:0.4,
        paddingHorizontal:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius:10,  
        alignItems:'center',
        shadowOpacity: 0.8,
        shadowRadius: 20,
        shadowOffset: {
        height: 1,
        width: 0,
        },
        overflow:'hidden',
    },insideCard:{
        marginLeft:10,
        width:280,
        flexDirection:'row',
        alignItems:'center',
        

    }
})
export default styleModalLanguage;