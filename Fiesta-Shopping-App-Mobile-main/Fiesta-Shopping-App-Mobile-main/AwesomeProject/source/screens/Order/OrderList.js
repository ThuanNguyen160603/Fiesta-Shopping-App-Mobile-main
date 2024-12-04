import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styleOrderListScreen from './style'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header/Header'
import { commonStyles } from '../../css/styles/CommonStyles'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AxiosInstance from '../../util/AxiosInstance'
import ShowLoadingDialog from '../../components/LoadingDialog.js/LoadingDialog'
import { FlashList } from '@shopify/flash-list'
import { useSelector } from 'react-redux'
import { dataUserSelector } from '../../redux-store'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'

const OrderList = () => {
    const { t } = useTranslation()
    const [orderList, setOrderList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isMiniLoading, setIsMiniLoading] = useState(false)
    const userData = useSelector(dataUserSelector)
    const navigation = useNavigation()
    const onBack = () => {
        navigation.goBack()
    }
    const handleMore = () => {
        if (page < totalPage)
            setPage(prev => prev + 1)
    }
    const getOrderList = async () => {
        try {
            const response = await AxiosInstance.get(`order/getOrderByUser?page=${page}&userId=${userData._id}`)
            if (response.statusCode == 200 && page == 1) {
                setTotalPage(response.pages)
                setOrderList(response.data)
            } else if (response.statusCode == 200 && page > 1) {
                setOrderList([...orderList, ...response.data])
            }

            setIsLoading(false)
            setIsMiniLoading(false)
        } catch (error) {
            console.log("ERROR getOrderList: ", error);

        }
    }

    useEffect(() => {
        if (page == 1)
            setIsLoading(true)
        else
            setIsMiniLoading(true)
        getOrderList()


    }, [page])

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            if (page !== 1)
                setPage(1)
            else
                getOrderList()
        })

        return unsubscribe
    }, [])

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
    const index = 0
    const item = {}
    const RenderHeader = () => {
        return (
            <Header
                name={t("Order List")}
                onBack={onBack}
            />
        )
    }
    const isFocused = useIsFocused()
    const Loading = () => {
        return (
            <View>
                <ActivityIndicator size={'large'} color={'cyan'} style={{ justifyContent: 'center', alignItems: 'center' }} />
            </View>
        )
    }
    return (
        <Wrapper>

            {
                isLoading ?
                    <ShowLoadingDialog isLoading={isLoading} setIsLoading={setIsLoading} />
                    :

                    orderList.length > 0 ?
                        <FlashList
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={RenderHeader}
                            ListFooterComponent={isMiniLoading && <Loading />}
                            data={orderList}
                            decelerationRate={'fast'}
                            estimatedItemSize={120}
                            onEndReached={handleMore}
                            onEndReachedThreshold={1}
                            renderItem={({ item, index }) => {
                                return (
                                    <ItemOrderList

                                        item={item}
                                        index={index}
                                    />
                                )
                            }}

                        /> : <View >
                            <RenderHeader />
                            <Text
                                style={[styleOrderListScreen.textCenter, styleOrderListScreen.titleItem, { color: "gray" }]}
                            >{t("No available order")}.</Text>
                        </View>

            }

        </Wrapper>
    )
}

const ItemOrderList = ({ item, index }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styleOrderListScreen.itemView}
            onPress={() => navigation.navigate('OrderDetail', { orderId: item._id })}
        >
                        <Text style={[commonStyles.title, styleOrderListScreen.textItem]}>ID: {item._id}</Text>

            <Text style={[commonStyles.title, styleOrderListScreen.titleItem]}>{item.shipping.name}</Text>
            <Text style={[commonStyles.normalText, styleOrderListScreen.textItem]}>
                {t("Address")}: {`${item.shipping.houseNumber} ${item.shipping.street}, ${item.shipping.ward}, ${item.shipping.city}, ${item.shipping.country}`}
            </Text>
            <Text style={[commonStyles.normalText, styleOrderListScreen.textItem]}>{t("Status")}: {item.status}</Text>
            <Text style={[commonStyles.normalText, styleOrderListScreen.textItem]}>
                {t("Last update")}: {new Date(item.modifiedOn).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })}
            </Text>
        </TouchableOpacity>
    );
}


export default OrderList