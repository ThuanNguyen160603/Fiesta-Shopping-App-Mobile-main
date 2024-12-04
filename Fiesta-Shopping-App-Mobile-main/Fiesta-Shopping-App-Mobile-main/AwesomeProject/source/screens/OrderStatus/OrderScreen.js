import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text, ScrollView, Dimensions, Alert } from "react-native";
import { AppStyles } from "../../css/styles/CommonStyles";
import { commonStyles } from "../../css/styles/CommonStyles";
import { MetarialIcon } from "../../components/icon/Material";
import { SearchTextView } from "../../components/SearchView/SearchTextView";
import { MySection } from "../../components/textinput/AccessComponents";
import { POPPINS_FONT } from "../../css/theme/Theme";
import OrderStatusIndicator from "./components/OrderStatusIndicator";
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header/Header";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import AxiosInstance from "../../util/AxiosInstance";
import { StylePublic } from "../../css/styles/public";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
const OrderScreen = () => {
    const {t} = useTranslation()
    const route = useRoute()
    const { orderId } = route.params
    const navigation = useNavigation()
    const state = navigation.getState();
    const routes = state.routes;
    const previousRoute = routes[routes.length - 2];
    const [order, setOrder] = useState(null)
    const [orderProducts, setOrderProduct] = useState([])
    const onBack = () => {
        if (previousRoute.name == "PurchaseScreen")
            navigation.dispatch(StackActions.pop(2));
        else
            navigation.goBack()
    }
    
    const cancelOrder = async () => {
        try {
            const response = await AxiosInstance.post("order/cancelOrder", { order: order });

            if (response.statusCode == 200)
                Alert.alert("Notification", "You canceled your order",
                    [{
                        text: "Ok",
                        onPress: () => navigation.goBack()
                    }])
        } catch (error) {
            console.log("ERROR cancelOrder: ", error);
        }
    }
    const getOrderById = async () => {
        try {
            const response = await AxiosInstance.get(`order/getOrderById?orderId=${orderId}`)
            if (response.statusCode == 200) {
                console.log(JSON.stringify(response.data));
                setOrder(response.data)
                setOrderProduct(response.data.products)
            }
        } catch (error) {
            console.log("ERROR getOrderById: ", error);

        }
    }
    const estimatedTime = () => {
        const modifiedDate = new Date(order.modifiedOn);
        const random = Math.floor(Math.random() * 10)
        console.log(random);

        modifiedDate.setDate(modifiedDate.getDate() + random);

        // Sau đó, bạn có thể chuyển đổi thành định dạng chuỗi
        const formattedDate = modifiedDate.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
        return formattedDate
    }
    useEffect(() => {
        getOrderById()

        return () => {

        }
    }, [])
    const { height } = Dimensions.get('screen')
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Wrapper style={{ flex: 1 }}>
                <Header
                    onBack={onBack}
                    name={"Order Detail"}
                />

                {order ?
                    <View style={{paddingBottom:20}}>
                        <View style={AppStyles.StyleOrderScreen.cardViewShadow}>
                            < View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <MetarialIcon name='payment' size={25} color='black' />
                                <View style={{ width: 220 }}>
                                    <Text style={AppStyles.StyleOrderScreen.textIdOrder}>
                                        {order._id}
                                    </Text>
                                    <Text style={[commonStyles.normalText, { marginTop: 0, fontSize: 13 }]}>
                                        Ene Express
                                    </Text>
                                </View>
                                <MySection label={order.status} />
                            </View>
                            <View>
                                <OrderStatusIndicator status={order.status} />
                            </View>

                            <View style={{ marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View>
                                    <Text style={[commonStyles.normalText, { fontSize: 13 }]}>
                                        {t("Last update")}: {"\n"}

                                        {new Date(order.modifiedOn).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[commonStyles.normalText, { fontSize: 13 }]}>
                                        {t("Estimated arrived in")}: {"\n"}
                                        {

                                            estimatedTime()
                                        }

                                    </Text>

                                </View>
                            </View>
                            <View style={{
                                backgroundColor: '#f0f0f0',
                                width: '80%',
                                alignSelf: 'center',
                                height: 3,
                                margin: 5,
                                marginBottom: 10
                            }} />
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <View>
                                    <Text style={[commonStyles.normalText, { fontSize: 13 }]}>
                                        {t("From")}:
                                    </Text>
                                    <Text style={AppStyles.StyleOrderScreen.textLocation}>
                                        TP. Ho Chi Minh
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[commonStyles.normalText, { fontSize: 13 }]}>
                                        {t("To")}:

                                    </Text>
                                    <Text style={AppStyles.StyleOrderScreen.textLocation}>
                                        {`${order.shipping.houseNumber} ${order.shipping.street}, ${order.shipping.ward}, ${order.shipping.city}, ${order.shipping.country}`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <MySection label={t("Order List")} />
                            {
                                orderProducts.length > 0 && orderProducts.map((item, index) => {

                                    return (
                                        <Item
                                            item={item}

                                        />
                                    )
                                })
                            }
                        </View>
                        {
                            !['Delivered', 'Cancelled', 'Returned'].includes(order.status) &&
                            <Button
                                onPress={() => cancelOrder()
                                }
                                title={t("Cancel order")}
                                styleButton={{ backgroundColor: 'black' }}
                                styleText={{ color: 'white' }}
                            />
                        }
                    </View> :
                    <View></View>
                }
            </Wrapper>
        </ScrollView >
    )
}
const Item = ({ item, id }) => {

    console.log(JSON.stringify(item));
    
    const showVariation = () => {
        let variations = " "
        const dimension = item.productInfo.variation.dimension
        const keys = Object.keys(item.productInfo.variation.dimension)
        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];
            variations += element.charAt(0).toUpperCase() + element.slice(1) + ": " + dimension[element] + (index !== keys.length - 1 ? "\n " : "")
        }
        return variations
    }
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ProductDetail", {
                productId: item.productId
            })}
            style={[StylePublic.shadow, { borderRadius: 15, flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingVertical: 10, paddingHorizontal: 5 }]}>
            <Image style={{ borderRadius: 15, margin: 10, marginRight: 15, width: 80, height: 80, backgroundColor: 'black' }} source={item.productInfo.variation.subImage ? { uri: item.productInfo.variation.subImage.url } : require('../../assets/images/successful.gif')} />
            <View style={{ width: '68%' }}>
                <Text
                    style={[commonStyles.normalText, { fontWeight: 'bold', color: 'black', fontSize: 18 }]}
                >{item.productInfo.name}</Text>
              
                <Text
                    style={[commonStyles.normalText, { fontSize: 14 }]}
                >{showVariation()}</Text>
                <View
                    style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}
                >
                    <Text
                        style={[POPPINS_FONT.black, { fontSize: 20, fontWeight: 'bold', color: 'black' }]}
                    >{`$ ${item.productInfo.variation.price}`}</Text>
                    <Text
                        style={[POPPINS_FONT.black, { fontSize: 20, fontWeight: 'bold', color: 'black', alignSelf: 'flex-end' }]}
                    >{"x" + item.quantity.toString()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}




export default OrderScreen