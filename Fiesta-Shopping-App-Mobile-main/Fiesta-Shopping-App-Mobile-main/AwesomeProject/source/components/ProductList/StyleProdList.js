import { StyleSheet } from "react-native";
import { POPPINS_FONT } from "../../css/theme/Theme";
const StyleProdList = StyleSheet.create({

    // flatlist 


    // item
    itemView: {
        paddingHorizontal: 20, 
        marginHorizontal: 15,
        marginVertical:15,
        backgroundColor: '#ffffff', 
      
        alignItems: 'center', justifyContent: 'center'
    },
    image: {
        width:'100%',
        height:150,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 20,

    }, boldText: {
        fontFamily: POPPINS_FONT.bold,
        fontSize: 15,
        color: 'black'
    }, regularText: {
        fontFamily: POPPINS_FONT.regular
        , fontSize: 16
    }

})
export const StyleProdListFlex = StyleSheet.create({




    // item
    itemView: {

        width: '100%',
        // height: ,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20, // Tăng borderRadius để làm các góc mềm mại hơn
        elevation: 2, // Tăng độ cao của bóng đổ
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical:15, // Tăng padding để tạo không gian rộng hơn
        marginVertical: 5, // Tăng margin để tạo khoảng cách giữa các phần tử
        backgroundColor: '#ffffff', // Màu nền trắng để làm nổi bật nội dung
        shadowColor: '#000', // Màu của bóng đổ
        shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng đổ
        shadowOpacity: 0.3, // Độ mờ của bóng đổ
        shadowRadius: 3.84, // Bán kính của bóng đổ
        borderWidth: 1, // Đường viền
        borderColor: '#e0e0e0',
    }
    , view: {
        alignSelf: 'center',
        alignItems: 'center',
        // backgroundColor:'red',
        width:'60%',
        height: '85%',


    }, image: {
        backgroundColor:'red',
        width: "35%",
        height: 120,
        borderRadius:20,
        borderWidth:0.5,
        borderColor:'gray'

    }, boldText: {
        fontFamily: POPPINS_FONT.bold,
        fontSize: 16,
        color: 'black'
    }, regularText: {
        fontFamily: POPPINS_FONT.regular
        , fontSize: 16
    }

})
export default StyleProdList;