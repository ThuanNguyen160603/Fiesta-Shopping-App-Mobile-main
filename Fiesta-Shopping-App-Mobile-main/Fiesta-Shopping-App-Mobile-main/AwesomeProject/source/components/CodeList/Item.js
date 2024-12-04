import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { StylePublic, commonStyles } from '../../css/styles/public'
import { POPPINS_FONT } from '../../css/theme/Theme'

const CodeItem = ({ item, id }) => {
    return (
        <View style={[StylePublic.shadow,{borderRadius:15,flexDirection:'row' ,alignItems:'center',marginVertical:10}]}>
            <Image style={{borderRadius:15,margin:10,marginRight:15,width:80,height:80,backgroundColor:'black'}} source={require('../../assets/images/successful.gif')} />
            <View>
                <Text
                style={[commonStyles.normalText,{fontWeight:'bold',color:'black',fontSize:18}]}
                >Add Promo Code</Text>
                <Text
                style={[commonStyles.normalText,{fontSize:13}]}
                >#rieoasf</Text>
                <Text
                style={[POPPINS_FONT.black,{fontSize:20,fontWeight:'bold',color:'black'}]}
                >Price</Text>
            </View>
        </View>
    )
}

export default CodeItem

const styles = StyleSheet.create({

})