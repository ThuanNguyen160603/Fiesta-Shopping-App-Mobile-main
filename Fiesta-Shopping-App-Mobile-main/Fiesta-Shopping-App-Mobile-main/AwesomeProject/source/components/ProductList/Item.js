import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import StyleProdList, { StyleProdListFlex } from './StyleProdList'
import { useNavigation } from '@react-navigation/native';
import { formatText } from '../../util/CommonFunction';
import { Star } from '../../screens/ProductSearch/components/star';
import { useTranslation } from 'react-i18next';
const Item = ({ itemData, index, layout, horizontal }) => {

    const navigation = useNavigation()
    const onPress = async (id, index) => {
        console.log(id, index);
        navigation.navigate("ProductDetail", {
            productId: id
        })
    }
    return (
        <View>

            {
                layout == "Grid" ?

                    <ItemGrid onPress={onPress} index={index} itemData={itemData} />
                    :
                    <ItemFlex onPress={onPress} index={index} itemData={itemData} />
            }
        </View>
    )
}
const ItemGrid = ({ itemData, index, onPress }) => {
    const { t } = useTranslation()
    return (
        <TouchableOpacity
            style={{  maxHeight: 300, width: 200 }}

            activeOpacity={1}
            onPress={() => {
                if (typeof onPress == 'function')
                    onPress(itemData._id, index)
            }}
        >
            <View style={StyleProdList.itemView}>
                <Image style={[StyleProdList.image, {}]} imageStyle={{}} source={{ uri: itemData.images.length > 0 ? itemData.images[0].url : "https://mackweldon.com/cdn/shop/products/M01T12-TN_Front.png?v=1638913612" }}>

                </Image>
                    <Text style={[StyleProdList.regularText, { paddingTop: 10, fontSize: 14, width: '100%', textAlign: 'center' }]}>{formatText(itemData.name, 20, 2)}</Text>
                    <Text style={StyleProdList.boldText}>{`${itemData.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).split(".")[0]}`}</Text>

                    <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[StyleProdList.regularText, { fontSize: 14, fontWeight: '800' }]}>{t("Qty")}: {itemData.stock}</Text>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center'
                        }}>
                            <Text style={[StyleProdList.regularText, { fontSize: 14, fontWeight: '800' }]}>{itemData.rating}</Text>
                            <Star count={1} size={14} />
                        </View>

                    </View>
                </View>
        </TouchableOpacity>
    )
}
const ItemFlex = ({ itemData, index, onPress }) => {
    const { t } = useTranslation()
    return (
        <TouchableOpacity
            activeOpacity={1}

            style={{ width: '100%', alignSelf: 'center', borderRadius: 10 }}
            onPress={() => {
                if (typeof onPress == 'function')
                    onPress(itemData._id, index)

            }}
        >
            <View style={StyleProdListFlex.itemView}>
                <Image style={[StyleProdListFlex.image, {}]} imageStyle={{ borderRadius: 30 }} source={{ uri: itemData.images.length > 0 ? itemData.images[0].url : "https://mackweldon.com/cdn/shop/products/M01T12-TN_Front.png?v=1638913612" }}>

                </Image>

                <View style={StyleProdListFlex.view}>
                    <Text style={[StyleProdListFlex.regularText, { textAlign: 'center', width: "100%", maxHeight: 40 }]}>{formatText(itemData.name, 30, 2)}</Text>
                    <Text style={[StyleProdListFlex.boldText, { paddingTop: 6 }]}>{`${itemData.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).split(".")[0]}`}</Text>
                    <View style={{ flexDirection: 'row', width: "100%", position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[StyleProdList.regularText, { fontSize: 14, fontWeight: '800' }]}>{t("Qty")}: {itemData.stock}</Text>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center'
                        }}>
                            <Text style={[StyleProdList.regularText, { fontSize: 14, fontWeight: '800' }]}>{t("Rate")}: {itemData.rating}</Text>
                            <Star count={1} size={14} />
                        </View>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}




export default Item