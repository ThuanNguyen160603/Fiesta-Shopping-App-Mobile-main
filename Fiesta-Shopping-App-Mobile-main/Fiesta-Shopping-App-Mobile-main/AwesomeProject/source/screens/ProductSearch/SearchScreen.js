import { Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SearchTextView } from '../../components/SearchView/SearchTextView'
import { AppContext } from '../../util/AppContext'
import Wrapper from '../../components/Wrapper'
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { AppStyles, commonStyles } from '../../css/styles/CommonStyles'
import { useDispatch, useSelector } from 'react-redux'
import { filterSelector, onChangeName } from '../../redux-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'

const SearchScreen = ({ }) => {

    // HIDE BOTTOM NAVIGATION BAR 
    const navigation =useNavigation()
    
    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
           display:'none'
          }
        });

        return () => navigation.getParent()?.setOptions({
          tabBarStyle:{
            display:'flex',
            backgroundColor: "white",position: 'absolute', borderTopLeftRadius: 30,
            borderTopRightRadius: 30, height: 70, paddingLeft: 30, paddingRight: 30,
          }
        });
      }, [navigation]);

    const filter = useSelector(filterSelector)
    const { width } = Dimensions.get('screen')
    const { theme } = useContext(AppContext)
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const [text, setText] = useState('');
    const [historySearchList, setHistorySearchList] = useState([]);
    const onSubmitText = async (text) => {
        setText(text)
        const set = new Set(historySearchList)
        if (!set.has(text)&&text.length>0) {
            let newArr = [...historySearchList]
            newArr.unshift(text)
            setHistorySearchList(newArr)
        }
        dispatch(onChangeName(text))
        navigation.navigate("FilterProductScreen",{category:null})

    }
    const onHandleClick = async (item) => {
        if (typeof item !== 'undefined' && item.length > 0) {
            dispatch(onChangeName(item))
            setText(item)
        }
        navigation.navigate("FilterProductScreen",{category:null})
    }
    const getHistorySearchList = async () => {
        const historyList = await AsyncStorage.getItem('HistoryList')
        setHistorySearchList(JSON.parse(historyList))

    }
    const onDeleteItem = (target) => {
        const newHistoryList = [...historySearchList]
        const updatedHistoryList = newHistoryList.filter(item => { return item !== target })
        setHistorySearchList(updatedHistoryList)
    }
    const onBack = async () => {
        navigation.goBack()
        await AsyncStorage.setItem("HistoryList", JSON.stringify(historySearchList))
        dispatch(onChangeName(""))
    }
    useEffect(() => {
        console.log(JSON.stringify(filter));

        return () => {

        }
    }, [filter])

    useEffect(() => {
        const onFocusScreen = async () =>{
            if (isFocused)
                getHistorySearchList()
            else
            await AsyncStorage.setItem("HistoryList",JSON.stringify(historySearchList))
        }

        onFocusScreen()
        return () => {

        }
    }, [isFocused])
    const {t} =useTranslation()
    return (
        <KeyboardAvoidingView
            style={{backgroundColor:'white',height:'100%'}}
        >
            <ScrollView
                style={{ marginTop: 20 }}
            >
                <Wrapper>
                    <View
                        style={StyleSearchScreen.headerBar}
                    >
                        <TouchableOpacity onPress={() => onBack()}>
                            <Icon name="arrow-back-circle" color={theme.secondary} size={46} />

                        </TouchableOpacity>
                        <SearchTextView
                            width={"85%"}
                            text={text}
                            borderWidth={0.5}
                            onSubmitText={onSubmitText}
                            backGroundColor={theme.primary}
                        />

                    </View>
                    <Text
                        style={[commonStyles.normalText, { fontSize: 18, fontWeight: 'bold', marginVertical: 20, color: theme.secondary }]}
                    >
                        {t("History search")}
                    </Text>
                    <View
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5, marginLeft: -5, width: width }}
                    >

                        {historySearchList.length > 0 ? (
                            historySearchList.map((item, index) => (
                                <View
                                    style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: theme.primary }}
                                    key={item}
                                >
                                    <TouchableOpacity
                                        onPress={() => onHandleClick(item)}
                                        style={[
                                            AppStyles.StyleSearchScreen.listCat,
                                            {
                                                borderColor: theme.secondary, borderWidth: 0.5
                                            }
                                        ]}
                                        key={item._id}
                                    >
                                        <View
                                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                        >
                                            <Text
                                                style={[
                                                    commonStyles.normalText,
                                                    {
                                                        color: theme.secondary
                                                    }
                                                ]}
                                            >
                                                {item}
                                            </Text>
                                            <TouchableOpacity
                                                style={{ marginLeft: 5 }}
                                                onPress={() => onDeleteItem(item)}
                                            >
                                                <Icon name='close' size={18} color={theme.secondary} />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                            <Text style={commonStyles.normalText} >No history searches...</Text>
                        )}
                    </View>
                </Wrapper>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SearchScreen

const StyleSearchScreen = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }

})