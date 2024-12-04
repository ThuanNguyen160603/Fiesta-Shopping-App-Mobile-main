
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  AppState,
  LogBox,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ToastAndroid,
} from 'react-native';
import { FONTS } from './source/assets/Constants';
import {
  // AppState,
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { StyleLogin } from './source/css/styles/screens/StyleLogin';
import { LIGHT_MODE } from './source/config/ThemeAction';
import { DARK_MODE } from './source/config/ThemeAction';
import { POPPINS_FONT } from './source/css/theme/Theme';
import UserAccess from './source/screens/access/UserAccess';
import { AppContext, AppContextProvider } from './source/util/AppContext';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import AppNavigator from './source/util/AppNavigator';
import Login from './source/screens/access/Login';
import OrderScreen from './source/screens/OrderStatus/OrderScreen';

import SettingScreen from './source/screens/Profile/Settings/SettingScreen';

import Home from './source/screens/Home/Home';
import { StripeProvider } from '@stripe/stripe-react-native';
import EditCard from './source/screens/Profile/MyCreditCards/EditCard';
import TestScreen from './source/screens/test/Screen'
import { STRIPE_PUBLIC_KEY } from '@env'
import Multi from './source/screens/XXX';
import { ThemeContext } from './source/util/ThemeProvider';
import SignUp from './source/screens/access/SignUp';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { isLoginSelector, setIsAppKilled, setIsLogin, store } from './source/redux-store';
import MyCards from './source/screens/Profile/MyCreditCards/MyCards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import i18next from 'i18next';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  LogBox.ignoreAllLogs();
  const netInfo = useNetInfo()
  // const isLogin = useSelector(isLoginSelector)
  // Language 
  const changeLanguage = async (lng) => {
    i18next.changeLanguage(lng)
      .then(async () => await AsyncStorage.setItem("default-language", lng))
      .catch(error => console.log("Error:", error));
  }
 
  const saveIsLogin = async () => {
    try {
      const isLogin= store.getState().userReducer.isLogin
      console.log("isLoginValue: ",isLogin,Date.now());

      await AsyncStorage.setItem("isLogin", JSON.stringify(isLogin))
    } catch (error) {
      console.log("Get isLogin failed: ", error);

    }
  }
  const tokenExpiredNotification= ()=>{
    const {isLogin,isAppKilled}= store.getState().userReducer
    if(!isLogin&&!isAppKilled)
      ToastAndroid.show("Token Expired...",ToastAndroid.BOTTOM)
  }
  const checkLanguage = async () => {
    const defaultLanguageFromStorage = await AsyncStorage.getItem("default-language")
    if (defaultLanguageFromStorage !== null) {
      changeLanguage(defaultLanguageFromStorage);

    } else {
      changeLanguage("en");
    }
  }
  // Check app active.
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {

    // Token expired notification 
    tokenExpiredNotification()
    SplashScreen.hide()
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (
        // appState.current.match(/background/) &&
        nextAppState === 'active'
      ) {
        // setIsLogin 
        checkLanguage()
        const lastActiveTime = await getLastActiveTime()
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - lastActiveTime;

        if (timeElapsed > 20 * 60 * 1000) {
          store.dispatch(setIsAppKilled(true))
          console.log(timeElapsed.toString(), timeElapsed > 3000);

        }
        else {
          console.log(timeElapsed.toString(), timeElapsed > 3000);

          store.dispatch(setIsAppKilled(false))

        }

        console.log('App has come to the foreground!');
      } else if (nextAppState === 'background') {
        await saveLastActiveTime()
        await saveIsLogin()
        console.log('App has not come to the foreground!');
        console.log("Connection", netInfo.isConnected);

      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    const getLastActiveTime = async () => {
      try {
        const lastTime = await AsyncStorage.getItem("LAST_ACTIVE_TIME");
        return lastTime ? parseInt(lastTime) : null;
      } catch (error) {
        console.error('Lỗi khi lấy thời gian cuối:', error);
        return null;
      }
    };
    const saveLastActiveTime = async () => {
      try {
        const currentTime = new Date().getTime();
        await AsyncStorage.setItem("LAST_ACTIVE_TIME", currentTime.toString());
      } catch (error) {
        console.error('Lỗi khi lưu thời gian:', error);
      }
    };
    return () => {
      subscription.remove();
    };
  }, []);





  return (
    <Provider store={store}>
      <AppContextProvider>
        <NavigationContainer
        >
          <StripeProvider
            publishableKey={STRIPE_PUBLIC_KEY}
          >

            <AppNavigator />
          </StripeProvider>
        </NavigationContainer>
      </AppContextProvider>
    </Provider>

    // <Login />
  )

}



export default App;
