import { View, Text, TouchableOpacity, ScrollView, Alert, ToastAndroid, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Wrapper from '../../components/Wrapper'
import StyleProductDetail from '../ProductDetail/styles'
import { StylePublic, commonStyles } from '../../css/styles/public'
import StyleDeliveryAddressScreen from './styles'
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { styleCoProdScreen } from '../CategoryofProductScreen/Styles';
import StyleProfile from '../Profile/styles';
import Item from '../../components/Product/RecProductList/Item';
import CodeItem from '../../components/CodeList/Item';
import { useStripe, usePlatformPay, PlatformPayButton, PlatformPay, confirmPayment } from '@stripe/stripe-react-native';
import AxiosInstance from '../../util/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { dataUserSelector, deleteAll, deleteManyItemsInData, setUserData } from '../../redux-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import { MetarialIcon } from '../../components/icon/Material';
import { IonIcon } from '../../components/icon/IonIcon';
import { Dimensions } from 'react-native';

const DeliveryAddressScreen = () => {
    const isFocus = useIsFocused()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const userData = useSelector(dataUserSelector)
    const route = useRoute()
    const { cartChosenData } = route.params

    const [total, setTotal] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState("")
    const [card, setCard] = useState("")
    const [address, setAddress] = useState(null)

    const formatData = (cartChosenData) => {
        if (cartChosenData) {
            return cartChosenData.map(item => {
                let newItem = { ...item, productId: item.products._id };
                delete newItem.products
                return newItem
            })
        }

        return null
    }
    useEffect(() => {
        if (address)
            console.log(address);

        return () => {

        }
    }, [address])


    const calculateTotal = async () => {
        try {

            const formatChosenData = formatData(cartChosenData);
            const response = await AxiosInstance.post("cart/total", { products: formatChosenData })
            if (response.statusCode == 200)
                setTotal(response.total)
            else {
                Alert.alert("ERROR", "ERROR IN YOUR CARTS",
                    [{
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }]
                )

            }

        } catch (error) {
            console.log("Error at calculateTotal: ", error);
            Alert.alert("ERROR", "ERROR IN YOUR CARTS",
                [{
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }]
            )
        }
    }

    // GET USER 

    const getUser = async () => {
        try {
            const addresses = userData.address

            if (addresses.length > 0) {
                const defaultAddress = addresses.find((value) => value.isDefault == true)
                setAddress(defaultAddress)
                console.log(addresses);
            } else {
                Alert.alert("Warning", "You don't have any address. \nPlease add some.", [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.goBack()
                        }
                    }
                ])
            }

        } catch (error) {
            console.log("GET USER ERROR: ", error);

        }
    }
    // GET DEFAULT CARD 
    const getDefaultCard = async () => {
        try {
            const response = await AxiosInstance.get(`payment/get-default-card/${userData._id}`)
            if (response.statusCode == 200) {
                setCard(response.data);
            } else if (response.statusCode == 1000)
                Alert.alert("ERROR","You don't have any visa card",[{
                    text:'Ok',
                    onPress:()=>navigation.goBack()
                }])
            else if (response.statusCode == 1001)
                Alert.alert("ERROR","You don't have the default card.\n Please choose one in Setting > MyCard",
                    [{
                        text:'Ok',
                        onPress:()=>navigation.goBack()
                    }])

        } catch (error) {
            console.log("GET DEFAULT CARD ERROR: ", error);

        }
    }
    const getPaymentMethod = async () => {
        try {
            const paymentMethod1 = await AsyncStorage.getItem("PaymentMethod")
            if (!paymentMethod1) {
                Alert.alert("Error", "YOU NEED TO CHOOSE A PAYMENT METHOD IN SETTING", [
                    {
                        text: "OK", onPress: () => {
                            navigation.goBack()
                        }
                    }
                ])
                return
            }

            setPaymentMethod(paymentMethod1)

        } catch (error) {
            console.log("GET USER ERROR: ", error);

        }
    }
    useEffect(() => {
        if (paymentMethod) {
            if (paymentMethod == "Visa")
                getDefaultCard()
            else
                setCard("")
        }
    }, [paymentMethod, isFocus])
    useEffect(() => {
        if (isFocus) {
            calculateTotal()
            getUser()
            getPaymentMethod()
        }



    }, [isFocus])


    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none'
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'flex',
                backgroundColor: "white", position: 'absolute', borderTopLeftRadius: 30,
                borderTopRightRadius: 30, height: 70, paddingLeft: 30, paddingRight: 30,
            }
        });
    }, [navigation]);
    const { height } = Dimensions.get('screen')
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    // let paymentIntents = "";
    const [paymentIntents, setPaymentIntents] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [ephemeralKey, setEphemeralKey] = useState("")

    const [amount, setAmount] = useState(0)
    const onBack = async () => {
        if (navigation.canGoBack())
            navigation.goBack()
        if (paymentIntents) {
            await AxiosInstance.post(`/payment/cancelPaymentIntents/${paymentIntents.split("_secret_")[0]}/${userData._id}`).then((response) => console.log("delete successfully"))
            setCustomerId("")
            setEphemeralKey("")
            setPaymentIntents("")
        }


    }

    // Payment method
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                onBack()
                return true; // Ngăn không cho back lại
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );
    const { isPlatformPaySupported, confirmPlatformPayPayment } = usePlatformPay();

    React.useEffect(() => {
        (async function () {
            if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
                Alert.alert('Google Pay is not supported.');
                return;
            }
        })();
    }, []);

    const payByGoogle = async () => {
        console.log();

        const { error } = await confirmPlatformPayPayment(
            paymentIntents,
            {
                googlePay: {
                    testEnv: true,
                    merchantName: 'My merchant name',
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    billingAddressConfig: {
                        format: PlatformPay.BillingAddressFormat.Full,
                        isPhoneNumberRequired: true,
                        isRequired: true,
                    },
                },

            }
        );

        if (error) {
            Alert.alert(error.code, error.message);
         
            return;
        }
        onCreateOrder()
        Alert.alert('Success', 'The payment was confirmed successfully.');
    };
    const payByVisa = async () => {

        try {
            const sheet = await initPaymentSheet({
                merchantDisplayName: 'Example, Inc.',
                paymentIntentClientSecret: paymentIntents,
                customerEphemeralKeySecret: ephemeralKey,
                customerId: customerId,


            });
            if (sheet.error)
                throw sheet.error

            const windowPayment = await presentPaymentSheet()
            if (windowPayment.error)
                throw windowPayment.error
            else
                onCreateOrder()
        } catch (error) {
            console.log("ERROR payByVisa: ", error);


        }

    }
    const usePaymentMethod = async () => {

        if (paymentMethod == 'Visa') {
            payByVisa()
        } else if (paymentMethod == 'Google Pay') {
            payByGoogle()
        } else if (paymentMethod == "Cash on delivery") {
            onCreateOrder()
        }

    }
    useEffect(() => {
        if (paymentIntents) {
            usePaymentMethod()
        }
    }, [paymentIntents])

    const onCheckOut = async () => {
        try {
            let data123 = paymentIntents
            if (!data123.length > 0 && (paymentMethod == "Visa" || paymentMethod == "Google Pay")) {
                const response = await AxiosInstance.post("payment/intent", { userId: userData._id, products: formatData(cartChosenData), paymentMethod: paymentMethod })
                if (response.statusCode !== 200) {

                    console.log("ERROR send intent !!!!");

                    return
                }
                data123 = response.data;
                console.log("ALOOO", data123);
                setAmount(response.amount)
                setCustomerId(response.customerId)
                setEphemeralKey(response.ephemeralKey)
                setPaymentIntents(data123);
                return
            } else if (data123.length > 0)
                usePaymentMethod()
            else if(paymentMethod=="Cash on delivery")
                onCreateOrder()
            // Create order if payment Method = cash on delivery


        } catch (error) {
            console.log("ERROR CHECKOUT:", error.message);
            return
        }
    }

    const generateOrder = () => {
        const order = {
            userId: userData._id,
            products: formatData(cartChosenData),
            shipping: address,
            payments: {
                method: paymentMethod,
                amount: amount > 0 ? amount : total,
                TransactionId: paymentIntents ? paymentIntents.split("_secret_")[0] : null
            }
        }
        return order
    }
    const deleteCarts = async () => {
        try {
            const cartIDs = cartChosenData.map(item => item._id)
            const response = await AxiosInstance.post("cart/deleteCarts", { cartIDs: cartIDs })
            if (response.statusCode == 200) {
                dispatch(deleteManyItemsInData(cartIDs))
                dispatch(deleteAll())
            }
        } catch (error) {
            console.log("ERROR deleteCarts: ", error);

        }
    }
    const onCreateOrder = async () => {
        try {
            const order = generateOrder()
            const response = await AxiosInstance.post("order/createOrder", order)
            if (response.result) {

                deleteCarts()
                ToastAndroid.show("Purchase successfully", ToastAndroid.SHORT);
                setTimeout(() => {
                    console.log("navigation to OrderDetail");

                    navigation.navigate("OrderDetail", { orderId: response.data._id })
                }, 1000)
                if (paymentIntents) {
                    // await AxiosInstance.post(`/payment/cancelPaymentIntents/${paymentIntents.split("_secret_")[0]}/${userData._id}`).then((response) => console.log("delete successfully"))
                    setPaymentIntents("")
                    setCustomerId("")
                    setEphemeralKey("")
                }
            }

        } catch (error) {

        }
    }


    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[2]}
                style={{ height: height - 20, backgroundColor: 'white' }}
            >
                <Header
                    onBack={onBack}
                    name={"Delivery Address"}
                    styleText={{ fontSize: 20 }}
                />
                <Wrapper style={{ paddingBottom: 110 }}>

                    {address && <View
                        style={[StyleProfile.shadow, StyleDeliveryAddressScreen.boxView, {}]}
                    >
                        <Text
                            style={[commonStyles.normalText, StyleDeliveryAddressScreen.textBoxView]}
                        >
                            Street:
                            <Text
                                style={[commonStyles.normalText, StyleDeliveryAddressScreen.miniTextBoxView]}
                            > {" " + address.houseNumber + " " + address.street}</Text>
                        </Text>
                        <Text
                            style={[commonStyles.normalText, StyleDeliveryAddressScreen.textBoxView]}
                        >
                            Ward:
                            <Text
                                style={[commonStyles.normalText, StyleDeliveryAddressScreen.miniTextBoxView]}
                            >{" " + address.ward}</Text>
                        </Text>
                        <Text
                            style={[commonStyles.normalText, StyleDeliveryAddressScreen.textBoxView]}
                        >
                            State/city/area:
                            <Text
                                style={[commonStyles.normalText, StyleDeliveryAddressScreen.miniTextBoxView]}
                            >{" " + address.city}</Text>
                        </Text>
                        <Text
                            style={[commonStyles.normalText, StyleDeliveryAddressScreen.textBoxView]}
                        >
                            Country:
                            <Text
                                style={[commonStyles.normalText, StyleDeliveryAddressScreen.miniTextBoxView]}
                            > {" " + address.country}</Text>
                        </Text>

                    </View>}
                    <Text style={[commonStyles.title, StyleDeliveryAddressScreen.title, { fontSize: 16, marginVertical: 10 }]}>
                        Product Items
                    </Text>
                    <View>

                        {
                            cartChosenData.map((item, index) => {
                                return (<Item
                                    item={item}
                                    key={item._id}
                                />)
                            })

                        }
                    </View>

                    {paymentMethod &&
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 15,
                                width: '100%',
                                borderTopWidth: 0.5,
                                borderBottomWidth: 0.5,
                                borderColor: 'gray',
                                justifyContent: 'space-between',

                                alignItems: 'center',
                                height: 50,
                            }}
                        >
                            <Text
                                style={[commonStyles.normalText, { fontSize: 16, color: 'black', fontWeight: 'bold' }]}
                            >PAYMENT METHOD: </Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => {
                                    navigation.navigate("MyCard", {
                                        screen: 'PaymentMethodScreen',
                                        params: {
                                            previousScreen: route.name,
                                        },
                                    })
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={[commonStyles.normalText, { fontWeight: 'bold' }]}>{paymentMethod
                                        // + (paymentMethod == "Visa" && card ? `  **** **** **** ${card}` : "")
                                    }</Text>
                                    <IonIcon
                                        name={'chevron-forward'}
                                        size={18}
                                        color={"black"}
                                    />
                                </View>



                            </TouchableOpacity>
                        </View>
                    }
                </Wrapper>

            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0 }}>
                {/* <Wrapper> */}
                <View style={[StyleProductDetail.addCartView, { width: 400, marginHorizontal: 6 }]}>
                    <View>
                        <Text style={[StyleProductDetail.regular, { color: '#828282' }]}>Total Price</Text>
                        <Text style={[StyleProductDetail.title, { color: '#000000' }]}>${total.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        style={[
                            commonStyles.btnAccess_dark
                            , {
                                backgroundColor: 'black',
                                width: 220,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 10
                            }]}
                        onPress={() => onCheckOut()}
                    >
                        {/* <Icon name='cart-outline' size={30} color={"white"} /> */}
                        <Text style={[StyleProductDetail.title, { color: '#ffffff' }]}>Place order</Text>
                    </TouchableOpacity>
                </View>
                {/* </Wrapper> */}
            </View>
        </View>
    )
}

export default DeliveryAddressScreen

