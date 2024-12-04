import { View, Text, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LIGHT_MODE } from '../../config/ThemeAction'
import { DARK_MODE } from '../../config/ThemeAction'
import { LIGHT_DARK_MODE } from '../../css/theme/Theme'
import { AppContext } from '../../util/AppContext'
import { AppStyles, commonStyles } from '../../css/styles/CommonStyles'
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next'
import {
  MyTextInput,
  MySection,
  MyTextInputPassword,
  LineWithTextBetween
} from '../../components/textinput/AccessComponents'
import { SocialSignInButton } from '../../components/textinput/AccessComponents'
import { MetarialIcon } from '../../components/icon/Material'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AxiosInstance from '../../util/AxiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Wrapper from '../../components/Wrapper'
import Button from '../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { isLoginSelector, setIsLogin, setUserData } from '../../redux-store'
import { useTranslation } from 'react-i18next'
const Login = (props) => {
  const { navigation } = props;
  const [isModeApply, setisModeApply] = useState("LIGHT_MODE")
  // const { isLogin, setisLogin } = useContext(AppContext)
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch()
  //signin with mongo DB
  const login = async () => {
    if(!username && !password) ToastAndroid.show("No username or id",ToastAndroid.SHORT)
    try {
      const response = await AxiosInstance.post('userApi/login', { userName: username, cpassword: password })
      if (response.token && response.result === true) {
        console.log(response.user);
        
        await AsyncStorage.setItem("token",response.token)
        dispatch(setUserData(response.user))
        console.log(response.user);
        
        ToastAndroid.show('Signin Successful', ToastAndroid.SHORT);
        dispatch(setIsLogin(true))

      } else if (response.result === false) {
        ToastAndroid.show('Signin Failed', ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log('Signin error: ' + error);
    }
  }

  //textInput handler
  const passwordHandler = (text) => {
    setpassword(text)
  }
  const userNameHandler = (text) => {
    setusername(text)
  }
  //textInput handler
const {t} = useTranslation()
  return (
    <Wrapper >
      <ImageBackground resizeMode='cover' source={require('../../assets/images/logo.jpg')} style={{ height: 180 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ margin: 10,marginLeft:0 }}>
          <MetarialIcon name='arrow-back' color='black' size={30} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={commonStyles.container}>
        <Text style={[commonStyles.title, { color: 'black', fontSize: 22 }]}>
          {t("Welcome")}!
        </Text>
        <Text style={commonStyles.normalText}>
          {t("Sign-in-remind")}
        </Text>
        <View style={{ marginTop: 50 }}>
          <MySection label='Email' />
          <MyTextInput placeholder={t("email-placeholder")} onChangeText={userNameHandler} />
        </View>
        <View style={{ marginTop: 25 }}>
          <MySection label={t("Password")} />
          <MyTextInputPassword placeholder={t("password-placeholder")} onChangeText={passwordHandler} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
          onPress={()=>login()}
            title={t("Sign in")}
            styleButton={{backgroundColor:'black',width:'100%'}}
            styleText={{color:'white'}}
          />

        </View>
      </View>
    </Wrapper>
  )
}

export default Login