import { View, Text, Image, TouchableOpacity, TextInput, useWindowDimensions, Alert, ActivityIndicator, Modal, Dimensions, BackHandler } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { styleCoProdScreen } from '../CategoryofProductScreen/Styles'
import Icon from 'react-native-vector-icons/Ionicons';
import Wrapper from '../../components/Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { StylePublic, commonStyles } from '../../css/styles/public';
import { styleCart } from './styles';
import { POPPINS_FONT } from "../../css/theme/Theme";
import { AppContext } from '../../util/AppContext';
import { CheckBox } from '../../components/textinput/AccessComponents';
import Button from '../../components/Button/Button';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '../../components/icon/FontAwesome';
import { cartChosenDataSelector, addAll, deleteAll, cartDataSelector, onChangeCartData, onUpdateItemInCartData, addItemInChosenData, deleteManyItemsInData, deleteManyItemInData, deleteItemInChosenData, deleteItemInData, onUpdateItemInCartChosenData, dataUserSelector } from '../../redux-store';
import AxiosInstance from '../../util/AxiosInstance';
import { FlashList } from '@shopify/flash-list';
import { useIsFocused } from '@react-navigation/native';
import { formatText } from '../../util/CommonFunction';
import { useTranslation } from 'react-i18next';

const Cart = () => {
    const userData = useSelector(dataUserSelector)
    const isFocused = useIsFocused();
    const [total, setTotal] = useState(0)
    const navigation = useNavigation()

    const { theme } = useContext(AppContext)
    const [page, setPage] = useState(1)
    const [id, setId] = useState("")
    const dispatch = useDispatch()
    const { t } = useTranslation()
    //  Cart data 
    const cartData = useSelector(cartDataSelector)
    const cartChosenData = useSelector(cartChosenDataSelector);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
    const handleDelay = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setIsLoading(true);

        }, 2 * 1000);
        // Bat dong bo cart 


        setTimeoutId(newTimeoutId);
    };
    useEffect(() => {
        if (isLoading)
            calculateTotal();

    }, [isLoading])

    const getCart = async () => {
        try {
            const response = await AxiosInstance.get(`cart/getByPage/${page}/${userData._id}`)
            if (response.statusCode == 200 && page == 1) {
                dispatch(onChangeCartData(response.data.result))
                setTotalPage(response.data.pages)
            }
            else if (response.statusCode == 200 && page > 1)
                dispatch(onChangeCartData([...cartData, ...response.data.result]))
        } catch (error) {
            console.log("Error at getCart: " + error);
        }

    }


    const deleteCarts = async () => {
        try {
            const cartIDs = cartChosenData.map(item => item._id)
            const response = await AxiosInstance.post(`cart/deleteCarts`, { cartIDs: cartIDs })
            if (response.statusCode == 200)
                dispatch(deleteManyItemsInData(cartChosenData.map(item => item._id)))
        } catch (error) {
            console.log("Error at deleteCarts: " + error);

        }
    }

    useEffect(() => {
        if (isFocused) {
            getCart();
            
        } else {
            dispatch(deleteAll())
        }


    }, [isFocused])
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                BackHandler.exitApp();
                return true; // Ngăn không cho back lại
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );
    const { height } = Dimensions.get('screen')
    const ShowLoadingDialog = () => {

        // Giả sử bạn thực hiện một hành động nào đó cần thời gian và sau khi hoàn tất, ẩn dialog đi


        return (
            <Modal
                transparent={true}
                animationType="none"
                visible={isLoading}
                onRequestClose={() => setIsLoading(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        height: 100,
                        width: 100,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator animating={isLoading} size="large" color="#0000ff" />
                    </View>
                </View>
            </Modal>
        )
    };
    const formatData = (cartChosenData) => {
        if (cartChosenData) {
            return cartChosenData.map(item => {
                const newItem = { ...item, productId: item.products._id };
                return newItem
            })
        }

        return null
    }


    const calculateTotal = async () => {
        try {

            const formatChosenData = formatData(cartChosenData);
            const response = await AxiosInstance.post("cart/total", { products: formatChosenData })
            if (response.statusCode == 200)

                setTotal(response.total)
            setIsLoading(false)
        } catch (error) {
            console.log("Error at calculateTotal: ", error);
        }
    }
    useEffect(() => {


        if (cartChosenData.length > 0) {
            handleDelay()

        }
        else
            setTotal(0)

    }, [cartChosenData])

    const onCheckout = async () => {
        try {
            let isNonStockTrouble = true
            const response = await AxiosInstance.post("productApi/getStockManyProducts", { items: formatData(cartChosenData) });
            if (response.result) {
                const checkStockData = response.data
                const newCartData = cartData.map((item) => {
                    const stockData = checkStockData.find(stockItem => stockItem.variationId === item.variationId
                        && item.isStockSufficient !== stockItem.isStockSufficient
                    );

                    if (stockData) {
                        isNonStockTrouble = false
                        const updatedVariations = item.products.variations.map(variation => {
                            if (variation._id === stockData.variationId) {
                                return {
                                    ...variation,
                                    stock: stockData.stockAvailable,
                                };
                            }
                            return variation;
                        });

                        return {
                            ...item,
                            products: {
                                ...item.products,
                                variations: updatedVariations
                            },
                            isStockSufficient: stockData.isStockSufficient
                        };
                    }

                    return item;
                });

                if (!isNonStockTrouble) {
                    dispatch(onChangeCartData(newCartData))

                }
            }

            if (cartChosenData.length > 0 && isNonStockTrouble)
                navigation.navigate("PurchaseScreen", { cartChosenData: cartChosenData })
        } catch (error) {
            console.log("ERROR CHECKKKK STOCKK", error);

        }
    }
    const renderFooter = () => {
        return (
            <View>
                <View style={[StylePublic.card, StylePublic.shadow, { backgroundColor: theme.tertiary, elevation: 3, borderRadius: 7, marginTop: 30 }]}>
                    <View style={[, { paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <Text style={[styleCart.title, { fontSize: 16, textAlignVertical: 'bottom', color: theme.secondary }]}>{t("Subtotal")}:</Text>
                        <Text style={[styleCart.title, { fontSize: 16, textAlignVertical: 'bottom', color: theme.secondary }]}>${total}</Text>
                    </View>
                    <View style={StylePublic.horizonLine}></View>
                    <View style={[, { paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <Text style={[styleCart.title, { fontSize: 16, textAlignVertical: 'bottom', color: theme.secondary }]}>{t("Shipping")}:</Text>
                        <Text style={[styleCart.title, { fontSize: 16, textAlignVertical: 'bottom', color: theme.secondary }]}>$0</Text>
                    </View>
                    <View style={StylePublic.horizonLine}></View>
                    <View style={[, { paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <Text style={[styleCart.title, { fontSize: 16, textAlignVertical: 'bottom', color: theme.secondary }]}>{t("Bag Total")}:</Text>
                        <Text style={[styleCart.title, { fontSize: 16, textAlignVertical: 'bottom', color: theme.secondary }]}>${total}</Text>
                    </View>
                    <View style={StylePublic.horizonLine}></View>

                </View>
                <Button
                    onPress={() => onCheckout()}
                    title={t("Proceed to checkout")}
                    styleButton={{ backgroundColor: theme.secondary }}
                    styleText={{ color: 'white' }}
                />
            </View>
        )
    }

    return (
        <Wrapper>
            {/* <Header /> */}
            <ShowLoadingDialog />
            {cartData.length > 0 ?
                <View style={{ height: height }}>
                    <View
                        style={{ marginVertical: 20 }}
                    >

                        {
                            cartChosenData.length > 0 ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        onPress={() => deleteCarts()}
                                    >
                                        <Text style={[commonStyles.normalText, { color: 'red', fontWeight: 'bold', fontSize: 18 }]}>{t("Delete")}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => dispatch(deleteAll(cartData))}
                                    >
                                        <Text style={[commonStyles.normalText, { color: '#0073ff', fontWeight: 'bold', fontSize: 18 }]}>{t("Unselect All")}</Text>
                                    </TouchableOpacity>
                                </View> :
                                <TouchableOpacity
                                    onPress={() => dispatch(addAll())}
                                    style={{ alignSelf: 'flex-end' }}
                                >
                                    <Text style={[commonStyles.normalText, { color: '#0073ff', fontWeight: 'bold', fontSize: 18 }]}>{t("Select All")}</Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <FlashList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        data={cartData}
                        onEndReached={() => {
                            if (totalPage > page)
                                setPage(prev => prev + 1)
                        }}
                        keyExtractor={(item)=>item._id}
                        extraData={cartData}
                        onEndReachedThreshold={0.8}
                        renderItem={({ item, index }) => {
                            return (
                                <ItemCart item={item} calculateTotal={calculateTotal} />
                            )
                        }}
                        ListFooterComponent={renderFooter}
                        estimatedItemSize={100}
                    />
                </View>
                :
                <Text style={[commonStyles.normalText, {
                    fontSize: 20,
                    color: '#333333',
                    flex: 1,
                    textAlignVertical: 'center',
                    textAlign: 'center',

                }]}>{t("No available items in cart")}{"\n"}{t("Please add some ^.^")}</Text>
            }


        </Wrapper>
    )
}
const ItemCart = ({ item }) => {
    
    const { t } = useTranslation()
    const { theme } = useContext(AppContext)
    const { width } = useWindowDimensions()
    const cartChosenData = useSelector(cartChosenDataSelector);
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(item?.quantity);
    const [check, setCheck] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isInStock, setIsInStock] = useState(true)
    const [variation, setVariation] = useState(item.products.variations[0])
    // const quantityRef = useRef(quantity);

    const generateVariation = () => {

        let variationString = "";
        const dimension = variation.dimension
        const keys = Object.keys(dimension)

        for (let index = 0; index < keys.length; index++) {
            variationString += dimension[keys[index]] + (index == keys.length - 1 ? "" : ", ");

        }

        return variationString
    }

    const updateItem = async () => {
        try {

            const response = await AxiosInstance.post(`cart/update?cartID=${item._id}`, { updateFields: { quantity: quantity } })
            if (response.result) {
                let updateFields = { id: item._id, quantity: quantity }

                if (quantity <= variation.stock) {
                    setIsInStock(true)
                    updateFields = { ...updateFields, isStockSufficient: true }

                }
                dispatch(onUpdateItemInCartData(updateFields))
                console.log("quantity<=variation.stock:  ", quantity <= variation.stock, quantity, variation.stock, JSON.stringify(updateFields));

                const ids = cartChosenData.map(item => item._id)
                const set = new Set(ids)
                // console.log("UPDATE", set.has(item._id));
                if (set.has(item._id))
                    dispatch(onUpdateItemInCartChosenData(updateFields))
            }
        } catch (error) {
            console.log("Update Item: ", error);
        }
    }
    useEffect(() => {
        setQuantity(item.quantity)


    }, [item.quantity]);
    useEffect(() => {

        setIsInStock(item.isStockSufficient)
        if (!item.isStockSufficient)
            setCheck(false)


    }, [item.isStockSufficient]);
    useEffect(() => {
        if (quantity !== item.quantity)
            handleDelay()
    }, [quantity]);
    const checked = () => {
        const set = new Set(cartChosenData.map(item => item._id))
        if (set.has(item._id) && item.isStockSufficient)
            setCheck(true)
        else
            setCheck(false)
        return
    }
    useEffect(() => {
        checked();
    }, [cartChosenData]);
    useEffect(() => {
        if (check) {

            dispatch(addItemInChosenData(item))
        }
        else
            dispatch(deleteItemInChosenData(item._id))
    }, [check]);
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
    const handleDelay = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            // console.log(`Final Counter Value: ${quantityRef.current}`);
            updateItem()


        }, 0.5 * 1000);
        setTimeoutId(newTimeoutId);
    };

    const handleBlur = () => {
        if (Number(quantity) > 0) {
            // dispatch(setNum(Number(quantity)));
            handleDelay();
        } else {
            Alert.alert("Warning", "Phải nhập số lượng lớn hơn 0")
            setQuantity(1)
        }

    };

    const handleTextChange = (text) => {
        if (text === "") {
            setQuantity(""); // Đặt chuỗi rỗng cho quantity
        } else {
            setQuantity(Number(text));
        }
    };

    // Delete item in cart
    const swipeableRef = useRef()
    const onSwipeableClose = () => {
        swipeableRef.current.close();
    }
    const renderRightActions = ({ }) => {
        const deleteItem = async () => {
            try {
                const response = await AxiosInstance.post(`cart/delete?cartID=${item._id}`)
                if (response.statusCode == 200)
                    dispatch(deleteItemInData(item._id))
            } catch (error) {
                console.log("Error at deleteItem: ", error);
            }
        }

        return !check ?
            (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => { deleteItem(); onSwipeableClose(); }}
                    style={{
                        backgroundColor: 'black',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 100,
                        height: 140,
                        borderTopRightRadius: 30
                        , borderBottomRightRadius: 30
                        , marginRight: 10
                    }}>

                    <FontAwesomeIcon name={"trash"} size={60} color={'white'} />
                </TouchableOpacity>
            ) : null
    };

    return (
        <GestureHandlerRootView>
            <Swipeable
                renderRightActions={renderRightActions}
                ref={swipeableRef}
                rightThreshold={100}
                leftThreshold={100}
                overshootLeft={false}
                overshootRight={false}
                overshootFriction={8}
                friction={1}
            >
                <View
                    style={[styleCart.card, {
                        opacity: !isInStock ? 0.8 : 1,
                        marginBottom: 10,
                        backgroundColor: theme.tertiary,
                        alignItems: 'center',

                    }]}>
                    <CheckBox
                        isDisable={!isInStock}
                        checked={check} onChange={() => {
                            if (cartChosenData.length >= 20) {
                                Alert.alert("Warning", "You mustn't choose over 20 items in the cart.")
                                return
                            }
                            setCheck(!check)
                        }} styleCheckBox={styleCart.checkbox} />
                    <Image style={[styleCart.image, {}]} source={{ uri: variation.subImage.url }} />
                    <View style={[styleCart.para, { width: '70%' }]}>
                        <View style={{}}>
                            <Text style={[styleCart.title, { color: theme.secondary }]}>{item.products.name}</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={[styleCart.regular, { paddingTop: 5, color: theme.secondary }]}>{formatText(generateVariation(), 50, 2)}</Text>
                            {
                                !isInStock && <Text style={[styleCart.title, { color: 'red', fontSize: 16, fontWeight: 'bold' }]}>{t("Out of stock")}</Text>
                            }
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styleCart.title, { fontSize: 18, textAlignVertical: 'bottom', color: theme.secondary }]}>$ {variation.price + ""}</Text>
                            <View style={[styleCart.quantity, { backgroundColor: '#e4e4e4', elevation: 2, marginRight: '5%' }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (quantity > 1)
                                            setQuantity(prev => Number(prev - 1))
                                    }}
                                >
                                    <Text style={[, { fontFamily: POPPINS_FONT.regular, color: 'black', fontSize: 13, fontSize: 15, margin: 0 }]}>-</Text>
                                </TouchableOpacity>
                                <TextInput style={[, { fontFamily: POPPINS_FONT.regular, color: 'black', fontSize: 14, textAlign: 'center', height: 50, color: 'black', margin: 0 }]}
                                    value={quantity.toString()}
                                    onChangeText={handleTextChange}
                                    onBlur={handleBlur} />
                                <TouchableOpacity
                                    onPress={() => {
                                        if (quantity < 100)
                                            setQuantity(prev => Number(prev + 1))
                                    }}
                                >
                                    <Text style={[, { fontFamily: POPPINS_FONT.regular, color: 'black', fontSize: 13, fontSize: 15, margin: 0 }]}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}
export default Cart