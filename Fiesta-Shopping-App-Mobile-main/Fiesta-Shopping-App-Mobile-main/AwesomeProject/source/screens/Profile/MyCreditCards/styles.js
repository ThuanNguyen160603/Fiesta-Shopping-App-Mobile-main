import { StyleSheet } from "react-native"
const styleMyCards = StyleSheet.create({

})

export const styleEditCards = StyleSheet.create({
    dropdownStyle: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.4,
        borderRadius: 10 ,
        paddingHorizontal: 8,
        width:350,
        alignSelf:'center',
        marginVertical:1
    },
    inputText:  {
        fontSize: 18,
        color: 'black',
        textAlignVertical: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        margin: 10,
    },
    alertText:{ color: 'red',fontSize:14,marginLeft:10 }
})
export default styleMyCards;