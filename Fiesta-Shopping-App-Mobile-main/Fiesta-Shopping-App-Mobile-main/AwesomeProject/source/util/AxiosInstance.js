import axios from "axios";
import { useContext } from "react";
import { AppContext, useAppContext } from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, BackHandler, ToastAndroid } from "react-native";
import { setIsAppKilled, setIsLogin, store } from "../redux-store";
import NetInfo from "@react-native-community/netinfo";
const AxiosInstance = axios.create({
    baseURL: 'http://192.168.1.3:3000/api/', // Địa chỉ cơ sở của API
    timeout: 10 * 1000, // Thời gian chờ tối đa (ms)
    headers: {
        'content-type': 'application/json', // Định dạng dữ liệu gửi đi là JSON
    },
});

AxiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;
        if (error.message == "Network Error") {
            const unsubscribe = NetInfo.addEventListener(async (state) => {
                if (state.isConnected) {
                    const retryResponse = await AxiosInstance(originalRequest);

                    return retryResponse.data;
                }
            });

            // Unsubscribe
            unsubscribe();
        }
        if (typeof error.response !== 'undefined' && error.response.status === 499 && error.response.data.message === "NEWACCESSTOKEN") {
            const newToken = error.response.data.token;
            await AsyncStorage.setItem('token', newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            console.log("SAVE NEW ACCESS TOKEN");

            try {
                const retryResponse = await axios(originalRequest);
                return retryResponse.data;
            } catch (retryError) {
                store.dispatch(setIsLogin(false))

                console.log("Error during retry:", retryError);
                return Promise.reject(retryError);
            }
        } else if (error.response.status === 499) {
            const isLogin = store.getState().userReducer.isLogin
            if (isLogin){
                store.dispatch(setIsLogin(false))
                ToastAndroid.show("YOUR SESSION TIMED OUT",ToastAndroid.SHORT)

            }
        } else if (error.response.status == 400) {
            Alert.alert("ERROR", error.response.data.message ? error.response.data.message.toUpperCase() :
                "SOMETHING WRONG WHEN SENT THE REQUEST \n PLEASE TRY LATER"
                , [
                    {
                        text: 'OK',
                        onPress: () => console.log(error.response.data)

                    }
                ])
        } else {
            Alert.alert("ERROR", "SOMETHING WRONG WHEN SENT THE REQUEST \n PLEASE TRY LATER", [
                {
                    text: 'OK',
                    onPress: () => console.log(error.response.data)

                }
            ])
        }

        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            delete config.headers['Authorization'];
        }
        return config;
    },
    (error) => {

        Promise.reject(error)
    }
);

export default AxiosInstance;
