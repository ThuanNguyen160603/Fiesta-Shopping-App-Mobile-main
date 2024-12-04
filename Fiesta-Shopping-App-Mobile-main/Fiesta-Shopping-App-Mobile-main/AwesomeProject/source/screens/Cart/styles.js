import { Dimensions, StyleSheet } from "react-native";
import { FONTS } from "../../assets/Constants";
import { POPPINS_FONT } from "../../css/theme/Theme";
const styleCart = StyleSheet.create({
    notifyCart: {
        position: 'absolute',
        top: -5,
        right: -5,
        fontSize: 12,
        paddingHorizontal: 6,
        padding: 2,
        color: 'white',
        borderRadius: 20,
        backgroundColor: 'black'
    }, title: {
        fontFamily: POPPINS_FONT.bold,
        fontSize: 20,
        color: 'black',
        marginLeft: 8,
    },
    regular: {
        fontFamily: POPPINS_FONT.regular,
        fontSize: 13,
        marginLeft: 8,
        marginTop: -8,
        width:150,
        height:70,
       flexWrap:'wrap',
    }
    , image: {
        width: 100,
        height: 100,
        borderRadius: 15,
        padding: 5
    },
    // CartViewItem
    card: {
        flexDirection: 'row',
        borderRadius:10,
        padding:10
       
    }, para: {
        justifyContent: 'space-around'
    },

    // 
    quantity: {
        alignSelf: 'flex-end',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width: 80,
        height: 30,
        paddingHorizontal:10
        ,borderRadius:20,
    },
    checkbox:{
        marginRight:'2%',
    }
})
export { styleCart }
