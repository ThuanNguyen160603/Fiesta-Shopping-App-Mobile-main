import { StyleSheet } from "react-native";

const styleOrderListScreen = StyleSheet.create({
    textCenter:{
        marginTop:'100%',
        alignSelf:'center',
        justifyContent:'center'
    },
    itemView: {
        borderRadius: 20, // Tăng borderRadius để làm các góc mềm mại hơn
        elevation: 2, // Tăng độ cao của bóng đổ
        overflow: 'hidden',
        padding: 20, // Tăng padding để tạo không gian rộng hơn
        margin: 15, // Tăng margin để tạo khoảng cách giữa các phần tử
        backgroundColor: '#ffffff', // Màu nền trắng để làm nổi bật nội dung
        shadowColor: '#000', // Màu của bóng đổ
        shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng đổ
        shadowOpacity: 0.3, // Độ mờ của bóng đổ
        shadowRadius: 3.84, // Bán kính của bóng đổ
        borderWidth: 1, // Đường viền
        borderColor: '#e0e0e0', // Màu của đường viền
    },
    titleItem:{
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    },
    textItem:{
        fontSize:17,
        color:'black',
        fontWeight:'100',
        },
})
export default styleOrderListScreen