import { View, Text, Image, Appearance, TouchableOpacity, ImageBackground, ScrollView, BackHandler } from 'react-native'
import React, { useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
import StyleProfile from './styles'
import { useTranslation } from 'react-i18next';
import { styleCoProdScreen } from '../CategoryofProductScreen/Styles'
import Wrapper from '../../components/Wrapper';
import Language from './Language/Language';
import { AppContext } from '../../util/AppContext';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { dataUserSelector, resetUser, setIsLogin } from '../../redux-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
    const userData = useSelector(dataUserSelector)

    const route = useRoute();
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
    const dispatch = useDispatch()
    const logOut = async () => {
        try {
            await AsyncStorage.removeItem("token")
            dispatch(resetUser())
            dispatch(setIsLogin(false))
        } catch (error) {
            console.log("Log out Error: ", error);

        }
    }

    const { navigation } = props;
    const { theme } = useContext(AppContext)
    const moveToNewScreen = (screenName) => {
        navigation.navigate(screenName, { previous_screen: route.name })
    }
    const { t } = useTranslation();

    const [open, setopen] = useState(false)
    return (

        <Wrapper style={{ backgroundColor: theme.tertiary, paddingBottom: 70 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* HEADER */}
                {/* <View style={styleCoProdScreen.header}>
                    <TouchableOpacity onPress={() => console.log("back")}>
                        <Icon name="arrow-back-circle" color={"black"} size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("search")} style={{ elevation: 50 }}>
                        <Icon name="settings-outline" color={"black"} size={30} />
                    </TouchableOpacity >
                </View> */}

                {/* PROFILE NAME */}
                <View style={[StyleProfile.card, StyleProfile.shadow, { flexDirection: 'row', marginTop: 25 }]}>
                    <ImageBackground imageStyle={{ borderRadius: 10 }} style={StyleProfile.image} source={userData.image ?{ uri: userData.image.url }:require('../../assets/images/avatar-male.png')} />
                    <View style={[StyleProfile.Para, {}]}>
                        <Text style={[StyleProfile.boldText, {}]}>{userData.name||"No name"}</Text>
                        <Text style={[StyleProfile.regularText, {}]}>{userData.userName}</Text>
                    </View>
                </View>


                {/* USER ACCESS*/}

                <View style={[StyleProfile.card, StyleProfile.shadow, {}]}>
                    <TouchableOpacity
                        onPress={() => moveToNewScreen("PersonalDetail")}
                        activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='person' />
                            </View>
                            <Text style={[StyleProfile.boldText, { fontSize: 16, marginLeft: 15 }]}>{t('Personal Detail')}</Text>
                        </View>
                        <Icon  size={25} color={"black"} name='chevron-forward' />
                    </TouchableOpacity>
                    <TouchableOpacity

                        onPress={() => moveToNewScreen("OrderList")}
                        activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='cart' />
                            </View>
                            <Text style={[StyleProfile.boldText, { fontSize: 16, marginLeft: 15   }]}>{t('My Orders')}</Text>
                        </View>
                        <Icon  size={25} color={"black"} name='chevron-forward' />
                    </TouchableOpacity>
                    {/* <TouchableOpacity  activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='heart'/>
                            </View>
                            <Text style={[StyleProfile.boldText,{fontSize:16,marginLeft:15}]}>My Favourites</Text>
                        </View>
                        <Icon  style={{marginLeft:130}} size={25} color={"black"} name='chevron-forward'/>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => moveToNewScreen("ShippingAddress")}
                        activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='home' />
                            </View>
                            <Text style={[StyleProfile.boldText, { fontSize: 16, marginLeft: 15 }]}>{t("Shipping Address")}</Text>
                        </View>
                        <Icon  size={25} color={"black"} name='chevron-forward' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => moveToNewScreen("MyCard")}
                        activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='card' />
                            </View>
                            <Text style={[StyleProfile.boldText, { fontSize: 16, marginLeft: 15 }]}>{t("Payment method")}</Text>
                        </View>
                        <Icon  size={25} color={"black"} name='chevron-forward' />
                    </TouchableOpacity>
                    {/* <TouchableOpacity  activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='settings'/>
                            </View>
                            <Text style={[StyleProfile.boldText,{fontSize:16,marginLeft:15}]}>Settings</Text>
                        </View>
                        <Icon  style={{marginLeft:175}} size={25} color={"black"} name='chevron-forward'/>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => setopen(true)}
                        activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='settings' />
                            </View>
                            <Text style={[StyleProfile.boldText, { fontSize: 16, marginLeft: 15 }]}>{t("language")}</Text>
                        </View>
                        <Icon size={25} color={"black"} name='chevron-forward' />
                    </TouchableOpacity>
                    <Language open={open} setOpened={setopen} />

                </View>
                <View style={[StyleProfile.card, StyleProfile.shadow, {}]}>
                    <TouchableOpacity activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='alert-circle' />
                            </View>
                            <Text style={[StyleProfile.boldText, { fontSize: 16, marginLeft: 15 }]}>{t("FAQs")}</Text>
                        </View>
                        <Icon  size={25} color={"black"} name='chevron-forward' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='bug' />
                            </View>
                            <Text style={[StyleProfile.boldText, { fontSize: 16, marginLeft: 15 }]}>{t("Privacy Policy")}</Text>
                        </View>
                        <Icon  size={25} color={"black"} name='chevron-forward' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => logOut()}
                        activeOpacity={0.8} style={StyleProfile.item}>
                        <View style={StyleProfile.miniItem}>
                            <View style={StyleProfile.iconWrapper}>
                                <Icon size={30} color={"black"} name='log-out' />
                            </View>
                            <Text style={[StyleProfile.boldText, { fontSize: 16, marginLeft: 15 }]}>{t("Log out")}</Text>
                        </View>
                        <Icon  size={25} color={"black"} name='chevron-forward' />
                    </TouchableOpacity>

                </View>
            </ScrollView>

        </Wrapper>
    )
}

export default Profile