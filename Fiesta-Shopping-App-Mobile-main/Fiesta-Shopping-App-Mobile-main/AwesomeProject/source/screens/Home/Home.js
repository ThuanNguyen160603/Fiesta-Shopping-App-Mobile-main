import { View, Text,BackHandler, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState,useCallback } from 'react'
import { commonStyles } from '../../css/styles/CommonStyles'
import { AppStyles } from '../../css/styles/CommonStyles'
import { MetarialIcon } from '../../components/icon/Material'
import { POPPINS_FONT } from '../../css/theme/Theme'
import { SearchTextView } from '../../components/SearchView/SearchTextView'
// import { dataCategory } from '../../components/CategoryList/data'
import { ListCategory } from '../../components/CategoryList/list'
import { MySection } from '../../components/textinput/AccessComponents'
import Wrapper from '../../components/Wrapper'
import { AppContext } from '../../util/AppContext'
import ProductList1 from '../../components/ProductList/ProductList1'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import AxiosInstance from '../../util/AxiosInstance'
import { onChangeMainCategory } from '../../redux-store/Slice/filterSlice'
import { useTranslation } from 'react-i18next'
const Home = () => {
    const{t} = useTranslation()
    const dispatch = useDispatch()
    const { theme } = useContext(AppContext)
    const [latestList, setLatestList] = useState([])
    const [soldList, setSoldList] = useState([])
    const [ratingList, setRatingList] = useState([])
    const [dataCategory, setDataCategory] = useState([])
    const navigation = useNavigation()
    const [categorySelected, setCategorySelected] = useState("")
    const [subCategory, setSubCategorySelected] = useState("")
    const {width} = Dimensions.get('screen')
    const isFocus = useIsFocused()
    useEffect(() => {
        if(categorySelected){
            dispatch(onChangeMainCategory(categorySelected))
            setCategorySelected("")
            navigation.navigate("FilterProductScreen",{category:dataCategory.filter((item)=>{return categorySelected==item._id})[0]})
        }
           
    
      return () => {
        
      }
    }, [categorySelected])
    
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

    const getCategoryList = async () => {
        try {
            const response = await AxiosInstance.get("category/getCategory")
            if (response.result) {
                setDataCategory(response.data)
            }
        } catch (error) {
            console.log("Error getLatestList: ", error);

        }
    }
    const getLatestList = async () => {
        try {
            const response = await AxiosInstance.get("productApi/getProductListByStandard?type=createAt")
            if (response.result) {
                setLatestList(response.data)
            }
        } catch (error) {
            console.log("Error getLatestList: ", error);

        }
    }
    const getRatingList = async () => {
        try {
            const response = await AxiosInstance.get("productApi/getProductListByStandard?type=rating")
            if (response.result) {
                setRatingList(response.data)
            }
        } catch (error) {
            console.log("Error getRatingList: ", error);

        }
    }
    const getSoldList = async () => {
        try {
            const response = await AxiosInstance.get("productApi/getProductListByStandard?type=sold")
            if (response.result) {
                setSoldList(response.data)
            }
        } catch (error) {
            console.log("Error getSoldList: ", error);

        }
    }
    useEffect(() => {
       if(isFocus){
        getSoldList()
        getRatingList()
        getLatestList()
        getCategoryList()
       }
        return () => {

        }
    }, [isFocus])

    return (
        <Wrapper style={commonStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={AppStyles.StyleHome.container}>
                    <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 50, padding: 6 }}>
                        <MetarialIcon name='adb' color={theme.primary} size={23} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: theme.secondary, borderRadius: 50, padding: 6 }}>
                        <MetarialIcon name='face' color={theme.primary} size={30} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: POPPINS_FONT.bold, fontSize: 25, color: theme.secondary }}>
                        {t("Welcome")},
                    </Text>
                    <Text style={{ fontFamily: POPPINS_FONT.bold, fontSize: 20, marginTop: -8 }}>
                       {t("Our Fashions App")}
                    </Text>
                </View>
                <View style={AppStyles.StyleHome.viewSearchBar}>
                    <SearchTextView width={290} borderWidth={0} backGroundColor={theme.primary} onFirstTap={() => navigation.navigate('SearchScreen')} />
                    <TouchableOpacity style={AppStyles.StyleHome.touchCapture}>
                        <MetarialIcon name='menu' color='white' size={23} />
                    </TouchableOpacity>
                </View>
                <View style={AppStyles.StyleHome.cardViewShadow}>
                    <View style={{ backgroundColor: '#eeeeee', borderRadius: 10 }}>
                        <Image style={{ width: 80, height: 80 }} source={require('../../assets/images/giay.png')} />
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: POPPINS_FONT.bold, color: 'black' }}>Axel Arigato</Text>
                        <Text style={{ fontFamily: POPPINS_FONT.regular }}>Clean triple Sneakers</Text>
                        <Text style={{ fontFamily: POPPINS_FONT.bold, color: 'black' }}>$245.00</Text>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, padding: 6 }}>
                            <MetarialIcon name='navigate-next' color='white' size={23} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 25 }}>
                    <MySection label={t("Categories")} />
                    <ScrollView horizontal={true} overScrollMode='never'
                        showsHorizontalScrollIndicator={false} style={{ overflow: 'visible' }}>
                        <ListCategory
                            data={dataCategory}
                            subcategorySelected={subCategory}
                            categorySelected={categorySelected}
                            setCategorySelected={setCategorySelected}
                            setSubCategorySelected={setSubCategorySelected}
                            style={{ flexDirection: 'row', marginTop: 5, marginLeft: -3 }} />
                    </ScrollView>
                    <View
                        style={{ marginHorizontal: 10, marginTop: 10, paddingBottom: 80 }}
                    >
                        <View
                            style={{ marginHorizontal: -10,width:width }}
                        >
                            <Text style={[commonStyles.normalText, { fontSize: 20, fontWeight: 'bold', }]}>{t("Latest products")}</Text>
                            {
                                latestList.length > 0 &&
                                <ProductList1 layout={"Grid"} data={latestList} horizontal={true} />
                            }

                        </View>
                        <View
                            style={{ marginHorizontal: -10,width:width }}
                        >
                            <Text style={[commonStyles.normalText, { fontSize: 20, fontWeight: 'bold', marginTop:20}]}>{t("Best sold products")}</Text>
                            {
                                soldList.length > 0 &&
                                <ProductList1 layout={"Grid"} data={soldList} horizontal={true} />
                            }

                        </View>
                        <View
                            style={{marginHorizontal: -10,width:width }}
                        >
                            <Text style={[commonStyles.normalText, {fontSize: 20, fontWeight: 'bold', }]}>{t("Best rating products")}</Text>
                            {
                                ratingList.length > 0 &&
                                <ProductList1 layout={"Grid"} data={ratingList} horizontal={true} />
                            }

                        </View>
                    </View>
                </View>
            </ScrollView>
        </Wrapper>
    )
}

export default Home