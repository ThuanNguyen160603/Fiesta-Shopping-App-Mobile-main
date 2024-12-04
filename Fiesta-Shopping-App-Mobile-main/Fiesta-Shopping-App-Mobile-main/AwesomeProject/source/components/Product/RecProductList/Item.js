import { StyleSheet, Text, View, Image } from 'react-native'
import React, { memo } from 'react'
import { StylePublic, commonStyles } from '../../../css/styles/public'
import { POPPINS_FONT } from '../../../css/theme/Theme'

const Item = ({ item, id }) => {

    // console.log("item", JSON.stringify(item));
    // console.log("variations: ", item.products.variations[0]);
    const showVariation = () => {
        let variations = " "
        const dimension = item.products.variations[0].dimension
        const keys = Object.keys(item.products.variations[0].dimension)
        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];
            variations += element.charAt(0).toUpperCase()+element.slice(1) + ": " + dimension[element]+ (index!==keys.length-1?"\n ":"")
        }
        return variations
    }
    return (
        <View style={[StylePublic.shadow, { borderRadius: 15, flexDirection: 'row', alignItems: 'center', marginVertical: 10,paddingVertical:10,paddingHorizontal:5 }]}>
            <Image style={{ borderRadius: 15, margin: 10, marginRight: 15, width: 80, height: 80, backgroundColor: 'black' }} source={item.products.variations[0].subImage.url?{uri:item.products.variations[0].subImage.url}:require('../../../assets/images/successful.gif')} />
            <View style={{width:'68%'}}>
                <Text
                    style={[commonStyles.normalText, { fontWeight: 'bold', color: 'black', fontSize: 18 }]}
                >{item.products.name}</Text>
                {/* <Text
                    style={[commonStyles.normalText, { fontSize: 14 }]}
                >Brand</Text> */}
                <Text
                    style={[commonStyles.normalText, { fontSize: 14 }]}
                >{showVariation()}</Text>
                <View
                    style={{ flexDirection: 'row',width:"100%",justifyContent:'space-between' }}
                >
                    <Text
                        style={[POPPINS_FONT.black, { fontSize: 20, fontWeight: 'bold', color: 'black' }]}
                    >{`$ ${item.products.variations[0].price}`}</Text>
                    <Text
                        style={[POPPINS_FONT.black, { fontSize: 20, fontWeight: 'bold', color: 'black',alignSelf:'flex-end' }]}
                    >{"x"+item.quantity.toString()}</Text>
                </View>
            </View>
        </View>
    )
}

export default memo(Item) 

