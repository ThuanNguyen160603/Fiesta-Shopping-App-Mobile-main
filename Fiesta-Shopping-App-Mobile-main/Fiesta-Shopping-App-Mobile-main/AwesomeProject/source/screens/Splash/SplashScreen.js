import { StyleSheet, Text, View, Easing, Image, ImageBackground, Animated, Alert, BackHandler } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { isLoginSelector, setIsAppKilled, setIsLogin, setUserData } from '../../redux-store'
import AxiosInstance from '../../util/AxiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    // Animation
    const animated = useRef(new Animated.Value(0)).current
    const interpolated = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0]
    })
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                    easing: Easing.linear
                }),
                Animated.timing(animated, {
                    toValue: 0,
                    duration: 1200,
                    useNativeDriver: true,
                    easing: Easing.linear
                })
            ])
        ).start();
    }, []);
    //

    const getUser = async () => {
        try {
            const response = await AxiosInstance.get("userApi/user")
            if (response.result)
                dispatch(setUserData(response.data))

        } catch (error) {
            console.log("Splash Screen get user error: ", error);
            if (error.response.status === 499)
                dispatch(setIsLogin(false))

        }
        dispatch(setIsAppKilled(false))

    }
    const getLoginStatus = async () => {
        try {
            const isLogin = await AsyncStorage.getItem("isLogin")

            return JSON.parse(isLogin)
        } catch (error) {
            console.log("getLoginStatus error: ", error);

        }
    }
    useEffect(() => {
        (async () => {

            const isLogin = await getLoginStatus()

            if (isLogin) {
                dispatch(setIsLogin(true))
                console.log("Splash screen: ", isLogin, Date.now());
                getUser()
            }
            else {
                dispatch(setIsLogin(false))
                timeout = setTimeout(() => {
                    dispatch(setIsAppKilled(false))
                }, 2000)
            }


        })()

        return () => {

        }
    }, [])

    return (
        <View style={{

            width: '100%', height: "100%",

        }}>
            <Animated.View style={{
                transform: [{ translateY: interpolated }],
                justifyContent: 'center',
            }}>
                <ImageBackground
                    style={{ width: '100%', height: "70%", marginTop: '40%' }}
                    source={require('../../assets/images/Fiesta-light.png')}
                />
            </Animated.View>
        </View>
    )
}

export default SplashScreen

// const styles = StyleSheet.create({})