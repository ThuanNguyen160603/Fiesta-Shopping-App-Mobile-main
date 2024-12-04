import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// screen import form...
import Login from "../screens/access/Login";
import SignUp from "../screens/access/SignUp";
import UserAccess from "../screens/access/UserAccess";
import Home from "../screens/Home/Home"
import Profile from "../screens/Profile/Profile";
import Cart from "../screens/Cart/Cart";
import Language from "../screens/Profile/Language/Language";
import { AppContext } from "./AppContext";
// screen import form...
const TabNavigator = createBottomTabNavigator();
const StackNavigator = createNativeStackNavigator();
import { FontAwesomeIcon } from "../components/icon/FontAwesome";
import { FoundationIcon, FocusedFoundationIcon } from "../components/icon/Foundation";
import SettingScreen from "../screens/Profile/Settings/SettingScreen";
import TestScreen from "../screens/test/Screen";
import { Alert, BackHandler, StatusBar, View } from "react-native";
import EditCard from "../screens/Profile/MyCreditCards/EditCard";
import FilterProductScreen from "../screens/FilterProductScreen/FilterProductScreen";
import SearchModal from "../screens/ProductSearch/SearchModal";
import SearchScreen from "../screens/ProductSearch/SearchScreen";
import ProductDetail from "../screens/ProductDetail/ProductDetail";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import DeliveryAddressScreen from "../screens/Purchase/DeliveryAddressScreen";
import MyCards from "../screens/Profile/MyCreditCards/MyCards";
import PaymentScreen from "../screens/Payment/PaymentScreen";
import ShippingAddressScreen from "../screens/Profile/ShippingAddress/ShippingAddressScreen";
import OrderList from "../screens/Order/OrderList";
import OrderScreen from "../screens/OrderStatus/OrderScreen";
import SplashScreen from "../screens/Splash/SplashScreen";
import { isAppKilledSelector, isLoginSelector, store } from "../redux-store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const CloneStack = () => {
    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName="UserAccess">
            <StackNavigator.Screen name="UserAccess" component={UserAccess} />
            <StackNavigator.Screen name="Login" component={Login} />
            <StackNavigator.Screen name="SignUp" component={SignUp} />
        </StackNavigator.Navigator>
    )
}
const ProductStack = () => {

    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <StackNavigator.Screen name="Home" component={Home} />
            <StackNavigator.Screen name="SearchScreen" component={SearchScreen} />
            <StackNavigator.Screen name="FilterProductScreen" component={FilterProductScreen} />
            <StackNavigator.Screen name="ProductDetail" component={ProductDetail} />

        </StackNavigator.Navigator>
    )
}

const MyProfile = () => {
    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName="Profile">
            <StackNavigator.Screen name="Profile" component={Profile} />
            <StackNavigator.Screen name="Language" component={Language} />
            <StackNavigator.Screen name="MyCard" component={MyCard} />
            <StackNavigator.Screen name="ShippingAddress" component={ShippingAddressScreen} />
            <StackNavigator.Screen name="PersonalDetail" component={SettingScreen} />
            <StackNavigator.Screen name="OrderDetail" component={OrderScreen} />
            <StackNavigator.Screen name="ProductDetail" component={ProductDetail} />

            <StackNavigator.Screen name="OrderList" component={OrderList} />

        </StackNavigator.Navigator>
    )
}
const MyCard = () => {
    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName="PaymentMethodScreen" >
            <StackNavigator.Screen name="CardListScreen" component={MyCards} />
            <StackNavigator.Screen name="CreateCardScreen" component={EditCard} />
            <StackNavigator.Screen name="PaymentMethodScreen" component={PaymentScreen} />

        </StackNavigator.Navigator>
    )
}
const PurchaseScreen = () => {
    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName="CartScreen">
            <StackNavigator.Screen name="CartScreen" component={Cart} />
            <StackNavigator.Screen name="PurchaseScreen" component={DeliveryAddressScreen} />
            <StackNavigator.Screen name="MyCard" component={MyCard} />
            <StackNavigator.Screen name="OrderDetail" component={OrderScreen} />

        </StackNavigator.Navigator>
    )
}
const Tab = () => {


    return (



        <TabNavigator.Navigator
            sceneContainerStyle={{
                backgroundColor: 'transparent',

            }}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarBackground: () => (
                    <View style={{ backgroundColor: 'red' }} />
                )
                ,
                tabBarStyle: {
                    backgroundColor: "white", position: 'absolute', borderTopLeftRadius: 30,
                    borderTopRightRadius: 30, height: "8%", paddingLeft: 30, paddingRight: 30,

                },
                tabBarIconStyle: {
                    position: 'relative',
                    bottom: 3,
                    alignItems: 'center',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        return !focused ? <FoundationIcon name='home' size={25} color='black' /> :
                            <FocusedFoundationIcon name='home' size={20} color='white' label='Home' focused={focused} />
                    } else if (route.name === 'Cart') {
                        return !focused ? <FoundationIcon name='shopping-cart' size={25} color='black' /> :
                            <FocusedFoundationIcon name='shopping-cart' size={20} color='white' label='Cart' focused={focused} />
                    } else if (route.name === 'MyProfile') {
                        return !focused ? <FoundationIcon name='torso' size={25} color='black' /> :
                            <FocusedFoundationIcon name='torso' size={20} color='white' label='Profile' focused={focused} />
                    }
                    // else if (route.name === 'Notified') {
                    //     return !focused ? <FoundationIcon name='social-squidoo' size={25} color='black' /> :
                    //         <FocusedFoundationIcon name='social-squidoo' size={20} color='white' label='Alert' focused={focused} />
                    // }
                }
            })}
            initialRouteName="Home"
        >
            <TabNavigator.Screen name="Home" component={ProductStack} />
            <TabNavigator.Screen name="Cart" component={PurchaseScreen} />
            <TabNavigator.Screen name="MyProfile" component={MyProfile} />
            {/* <TabNavigator.Screen name="Notified" component={Notified} /> */}
        </TabNavigator.Navigator>

    )
}

const WholeScreen = () => {
    const isLogin = useSelector(isLoginSelector)
   
    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
            {
                isLogin == true ?
                    <StackNavigator.Screen name="Tab" component={Tab} />
                    :
                    <StackNavigator.Screen name="CloneStack" component={CloneStack} />

            }
        </StackNavigator.Navigator>
    )
}
const AppNavigator = () => {
    const { theme } = useContext(AppContext)
    const isAppKilled = useSelector(isAppKilledSelector)

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={theme.primary}
                hidden={true}
            />
            {
                isAppKilled ?
                    <StackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen" >
                        <StackNavigator.Screen name="SplashScreen" component={SplashScreen} />
                    </StackNavigator.Navigator>
                    :
                    <StackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName={!isAppKilled ? "TestScreen" : ""} >
                        <StackNavigator.Screen name="WholeScreen" component={WholeScreen} />
                    </StackNavigator.Navigator>
            }
        </>
    )
}
export default AppNavigator;