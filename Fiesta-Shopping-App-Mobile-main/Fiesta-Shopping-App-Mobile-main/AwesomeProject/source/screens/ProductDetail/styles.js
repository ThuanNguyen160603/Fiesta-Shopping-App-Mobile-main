import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { POPPINS_FONT } from "../../css/theme/Theme";


const height=Dimensions.get('screen').height
const width=Dimensions.get('screen').width;
const StyleProductDetail = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'blue'
  },
  modal: {
    position: 'absolute',
    top: 50, // Điều chỉnh vị trí top để đặt dialog gần nút "Show Dialog"
    right: 10, // Điều chỉnh vị trí left để đặt dialog theo chiều ngang
    width: 50,
    height: 100,
    borderRadius: 10,
    elevation: 5, // Độ nâng cao cho Android
    shadowColor: 'black', // Đối với iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalContent: {
    backgroundColor: 'white',
    width: 60,
    width: 50,
    height: 250,
    borderRadius: 10,
    borderColor:'#ebebebfe'
  },
  imageListView:{

  },
  backgroundImage: {
    width: 300,
    height: 300,
    flex: 0.5,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  //itemSize 
  itemSizeView:{
    maxWidth:100,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    borderWidth:0.5,
    borderColor:'#2a2a2a'
  },
 

  // itemColor
  itemView: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 2
  },
  colorView: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent:'center',
    alignItems:'center'
  },
  favorite: {
    backgroundColor:'white',
    alignSelf: 'flex-end', margin: 20, marginTop: -90,
    padding: 5,
    justifyContent:'center',
    alignItems:'center',
    width:35,height:35,
    borderRadius: 100,
  },
  //  View 

  BigView:{
    backgroundColor: 'white',
     marginTop:-80,
     width:width,
     borderTopLeftRadius:30,
     borderTopRightRadius:30,
     paddingVertical:15,
     paddingBottom:100
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
    width:150,
    flexWrap:'wrap',
},
quantity: {
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center',
  width: 80,
  height: 30,
  paddingHorizontal:10
  ,borderRadius:20,
},
// addTocart

addCartView:{
  backgroundColor:'white',
  width:width-30,
  height:100,
  flexDirection:'row',
  alignItems:'center',
  // borderTopWidth:0.5,
  color:'#ffffffd2',
  borderTopLeftRadius:20,
  borderTopRightRadius:20
}
})
export default StyleProductDetail;