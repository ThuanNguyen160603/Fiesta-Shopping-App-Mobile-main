import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Wrapper from '../../components/Wrapper'
import styleFilterProduct from './Style'
import { MetarialIcon } from '../../components/icon/Material'
import { AppContext } from '../../util/AppContext'
import { FontAwesomeIcon } from '../../components/icon/FontAwesome'
import ProductList1 from '../../components/ProductList/ProductList1'
import { commonStyles } from '../../css/styles/CommonStyles'
import SearchModal from '../ProductSearch/SearchModal'
import { useDispatch, useSelector } from 'react-redux'
import { filterSelector, onReset } from '../../redux-store'
import AxiosInstance from '../../util/AxiosInstance'
import { useNavigation, useRoute } from '@react-navigation/native'
import ShowLoadingDialog from '../../components/LoadingDialog.js/LoadingDialog'
import { useTranslation } from 'react-i18next'
const FilterProductScreen = () => {
    const [Layout, setLayout] = useState("Flex")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingDialog, setIsLoadingDialog] = useState(false)
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const { theme } = useContext(AppContext)
    const [isOpen, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(20)
    const filter = useSelector(filterSelector)
    const navigation = useNavigation()
    const route =useRoute()
    const {category}= route.params

    const dispatch = useDispatch()
    const onBack = () => {
        navigation.goBack()
        dispatch(onReset())
    }
    function RenderHeader() {

        const { theme } = useContext(AppContext)

        return (
            <View style={{ backgroundColor: theme.primary, padding: 2, }}>
                <Header onBack={onBack} name={category?t("Categories")+": "+category.name:""}  title={filter.filter.name} styleHeader={{ backgroundColor: theme.primary }} />
                <View style={styleFilterProduct.setting}>
                    <TouchableOpacity
                        style={styleFilterProduct.MiniSetting}
                        onPress={() => setOpen(true)}
                    >
                        <FontAwesomeIcon
                            name={"filter"}
                            color={theme.secondary}
                            size={30}
                        />
                        <Text style={[commonStyles.normalText, { marginLeft: "10%", fontSize: 16 }]}>{t("Filter")}</Text>
                    </TouchableOpacity>
                    <View style={styleFilterProduct.MiniSetting}>
                        <TouchableOpacity
                            onPress={() => setLayout("Flex")}
                        >
                            <MetarialIcon name={"list"} color={theme.secondary} size={35} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setLayout("Grid")}
                        >
                            <MetarialIcon name={"dashboard"} color={theme.secondary} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={[styleFilterProduct.line, { borderColor: theme.tertiary }]}
                />
            </View>
        )
    }

    const getProducts = async () => {
        try {
          
            if (page == 1)
                setIsLoadingDialog(true)
            const requestData = { ...filter.filter, limit: limit, page: page }
            const response = await AxiosInstance.get(`productApi/searchProducts?${objectToQueryString(requestData)}`)
            if (response.result && response.data) {

                if (data.length > 0 && page > 1) {
                    setData([...data, ...response.data]);
                } else {
                    setData(response.data);
                }
                setTotalPage(response.totalPage)
            }

        } catch (error) {
            console.log("GET PRODUCT LIST ERROR: " + error);
        }
    }
    // useEffect(() => {
    //     console.log("dataaaa"+JSON.stringify(data));



    // }, [data])
    useEffect(() => {
        let timeout = null
        if (isLoadingDialog)
            timeout = setTimeout(() => {
                setIsLoadingDialog(false)
            }, 1000);
        return () => {
            clearTimeout(timeout)
        }
    }, [isLoadingDialog])
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
    useEffect(() => {
        if (filter) {
            setData([])
            if (page !== 1) {
                setPage(1)
            }
            else{
                getProducts()
            }
        }
    }, [filter])
    useEffect(() => {
       
        if(page>1)
        {
            setIsLoading(true)
        }
        getProducts()
        setIsLoading(false)

        return () => {

        }
    }, [page])

    return (
        <Wrapper style={{ backgroundColor: theme.primary }}>
            <SearchModal
                isOpen={isOpen}
                setOpen={setOpen}
            />
            {
                isLoadingDialog ?
                    <View>
                        {/* <RenderHeader /> */}
                        <ShowLoadingDialog
                            isLoading={isLoadingDialog}
                            setIsLoading={setIsLoadingDialog}
                        />
                    </View>
                    :
                    data.length > 0 ?
                        <ProductList1
                            data={data}
                            layout={Layout}
                            isLoading={isLoading}
                            header={RenderHeader}
                            LoadingMore={() => {
                                if (totalPage !== 0 && totalPage > page)
                                    setPage(prev => prev + 1)
                            }}
                        /> :
                        <View>
                            <RenderHeader />
                            <Text style={[commonStyles.normalText, { fontSize: 20, textAlign: 'center', textAlignVertical: 'center', marginTop: '50%' }]}>{t("No Available List")}. </Text>

                        </View>
            }
        </Wrapper>
    )
}
export default FilterProductScreen

function objectToQueryString(obj, prefix) {
    const queryString = Object.keys(obj).map(key => {
        const value = obj[key];
        const encodedKey = prefix ? `${prefix}[${key}]` : key;

        if (typeof value === 'object' && value !== null) {
            return objectToQueryString(value, encodedKey);
        } else {
            return `${encodeURIComponent(encodedKey)}=${encodeURIComponent(value)}`;
        }
    }).join('&');

    return queryString;
}