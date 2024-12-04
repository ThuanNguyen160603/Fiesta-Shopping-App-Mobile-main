import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
    Modal,
    Dimensions,
    ScrollView
} from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Slider from '@react-native-community/slider'
import React, { useContext, useEffect, useState } from 'react'
import { AppStyles } from '../../css/styles/CommonStyles'
import { MetarialIcon } from '../../components/icon/Material'
import { commonStyles } from '../../css/styles/CommonStyles'
import { Star } from './components/star'
import { dataRating, dataDaily } from './components/dataCagtegory'
import { dataCategory } from '../../components/CategoryList/data'
import {
    MySection,
    MyTextInput,
    MyTextInputPassword,
    CheckBox,
    SuccesfulSignUpDialog
} from '../../components/textinput/AccessComponents'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import data from...

import { FontAwesomeIcon } from '../../components/icon/FontAwesome'
import { ListCategory } from '../../components/CategoryList/list'
import Wrapper from '../../components/Wrapper'
import CustomMultiSlider from '../../components/Slider'
import { AppContext } from '../../util/AppContext'
import Button from '../../components/Button/Button'
import AxiosInstance from '../../util/AxiosInstance'
import { data } from '../../components/ProductList/ProductList1'
import { filterSelector, onChangeMainCategory, onChangeName, onChangePriceRange, onChangeSort, onChangeSubCategory } from '../../redux-store'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
// import data from...
const SearchModal = (props) => {
    const { t } = useTranslation()

    const filter = useSelector(filterSelector)
    const { isOpen, setOpen } = props
    const { theme } = useContext(AppContext)
    const [dataDailyy, setDataDailyy] = useState([
        {
            'name': t("Ascending"),
            "sortOrder": 'asc',
        },
        {
            'name': t("Descending"),
            "sortOrder": 'desc'
        }

    ]);
    //Radio button...
    const [categorySelected, setCategorySelected] = useState(filter.filter.category.mainCategory || '');
    const [subcategorySelected, setSubCategorySelected] = useState('');

    const [SortSelected, setSortSelected] = useState(null);
    const [CategoryListData, setCategoryListData] = useState([])
    const { width } = Dimensions.get('window').width
    useEffect(() => {
        console.log("FILTER", filter.filter.category.mainCategory);


        return () => {

        }
    }, [])
    //Radio button
    //slider...
    const [multiSliderValue, setMultiSliderValue] = React.useState([0, 100000]);
    //slider
    useEffect(() => {

        return () => {

        }
    }, [subcategorySelected])

    const onReset = () => {
        setSortSelected(null)
        setSubCategorySelected("")
        setCategorySelected("")
        setMultiSliderValue([0, 100000])
    }
    const dispatch = useDispatch();
    const onApply = () => {

        dispatch(onChangeMainCategory(categorySelected))
        dispatch(onChangePriceRange(multiSliderValue))
        dispatch(onChangeSort(SortSelected))
        dispatch(onChangeSubCategory(subcategorySelected))
        setOpen(false)
    }
    const getCategory = async () => {
        try {
            const response = await AxiosInstance.get("category/getCategory")
            if (response.result)
                setCategoryListData(response.data)
            return
        } catch (error) {
            console.log("Error getCategory: ", error);
        }
    }
    useEffect(() => {
        if (isOpen) {
            getCategory()
        }

        return () => {

        }
    }, [isOpen])



    nonCollidingMultiSliderValuesChange = (values) => setMultiSliderValue(values);
    return (
        <Modal
            visible={isOpen}
            onRequestClose={() => setOpen(false)}
        >
            <Wrapper style={commonStyles.container}>


                <TouchableOpacity
                    onPress={() => {
                        if (typeof setOpen == "function")
                            setOpen(false)
                    }}
                    style={{ alignSelf: 'flex-end' }}
                >
                    <MetarialIcon name='cancel' color='black' size={30} />
                </TouchableOpacity>

                <View style={{ marginTop: 20 }}>
                    <MySection label={t('Categories')} />
                    <ScrollView style={{height:'30%'}} showsVerticalScrollIndicator={false}>
                        {
                            CategoryListData && <ListCategory
                                expand={true}
                                data={CategoryListData}
                                style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5, marginLeft: -5, width: width }}
                                categorySelected={categorySelected}
                                setCategorySelected={setCategorySelected}
                                subcategorySelected={subcategorySelected}
                                setSubCategorySelected={setSubCategorySelected}
                            />
                        }
                    </ScrollView>
                    <View style={{ margin: 20 }}>
                        <MySection label={t("Price Range")} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', marginLeft: 7, marginTop: 5 }}>

                            <Text style={[commonStyles.title, { color: 'black', marginBottom: -10, fontSize: 15 }]}>
                                ${multiSliderValue[0].toLocaleString("en-US")} - ${multiSliderValue[1].toLocaleString("en-US")}
                            </Text>

                        </View>
                        <CustomMultiSlider multiSliderValue={multiSliderValue} onChangeMultiSliderValue={nonCollidingMultiSliderValuesChange} />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <MySection label={t('Sort By Price')} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5, marginLeft: -5 }}>
                            {
                                Object.keys(dataDailyy).length > 0 ?
                                    dataDailyy.map(item =>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => {
                                                if (!SortSelected || JSON.stringify({ ...item, sortBy: 'price' }) !== JSON.stringify(SortSelected))
                                                    setSortSelected({ ...item, sortBy: 'price' })
                                                else
                                                    setSortSelected(null)
                                            }}
                                            style={[
                                                AppStyles.StyleSearchScreen.listCat,
                                                { backgroundColor: SortSelected && SortSelected.sortBy == "price" && SortSelected.name == item.name ? theme.secondary : theme.primary }
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    commonStyles.normalText,
                                                    { color: SortSelected && SortSelected.sortBy == "price" && SortSelected.name == item.name ? theme.primary : theme.secondary }]}>
                                                {item.name.toString()}
                                            </Text>
                                        </TouchableOpacity>) :
                                    <View />
                            }
                        </View>


                    </View>
                    <View style={{ marginTop: 20 }}>

                        <MySection label={t('Sort By Sold')} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5, marginLeft: -5 }}>
                            {
                                Object.keys(dataDailyy).length > 0 ?
                                    dataDailyy.map(item =>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => {
                                                if (!SortSelected || JSON.stringify({ ...item, sortBy: 'sold' }) !== JSON.stringify(SortSelected))
                                                    setSortSelected({ ...item, sortBy: 'sold' })
                                                else
                                                    setSortSelected(null)
                                            }}
                                            style={[
                                                AppStyles.StyleSearchScreen.listCat,
                                                { backgroundColor: SortSelected && SortSelected.sortBy == "sold" && SortSelected.name == item.name ? 'black' : 'white' }
                                            ]}
                                            key={item.sortOrder}>
                                            <Text
                                                style={[
                                                    commonStyles.normalText,
                                                    { color: SortSelected && SortSelected.sortBy == "sold" && SortSelected.name == item.name ? 'white' : 'black' }]}>
                                                {item.name.toString()}
                                            </Text>
                                        </TouchableOpacity>) :
                                    <View />
                            }
                        </View>
                        <MySection label={t('Sort By Rating')} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5, marginLeft: -5 }}>
                            {
                                Object.keys(dataDailyy).length > 0 ?
                                    dataDailyy.map(item =>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => {
                                                if (!SortSelected || JSON.stringify({ ...item, sortBy: 'rating' }) !== JSON.stringify(SortSelected))
                                                    setSortSelected({ ...item, sortBy: 'rating' })
                                                else
                                                    setSortSelected(null)
                                            }}
                                            style={[
                                                AppStyles.StyleSearchScreen.listCat,
                                                { backgroundColor: SortSelected && SortSelected.sortBy == "rating" && SortSelected.name == item.name ? 'black' : 'white' }
                                            ]}
                                            key={item.sortOrder}>
                                            <Text
                                                style={[
                                                    commonStyles.normalText,
                                                    { color: SortSelected && SortSelected.sortBy == "rating" && SortSelected.name == item.name ? 'white' : 'black' }]}>
                                                {item.name.toString()}
                                            </Text>
                                        </TouchableOpacity>) :
                                    <View />
                            }
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 40 }}>
                    <Button
                        onPress={() => onApply()}
                        title={t("Apply")}
                        styleButton={{ backgroundColor: theme.secondary }}
                        styleText={{ color: theme.primary }}
                    />
                    <Button
                        onPress={() => onReset()}
                        title={t("Reset")}
                        styleButton={{ backgroundColor: theme.primary }}
                        styleText={{ color: theme.secondary }}
                    />
                </View>
            </Wrapper>
        </Modal>
    )
}

export default SearchModal
function isObjectIncluded(obj1, obj2) {
    if (obj1 !== null && typeof obj2 == 'object')
        return Object.entries(obj2).every(([key, value]) => obj1[key] === value);
    return false
}