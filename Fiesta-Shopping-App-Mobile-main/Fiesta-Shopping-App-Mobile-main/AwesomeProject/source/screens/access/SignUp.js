import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../css/styles/CommonStyles'
import { MetarialIcon } from '../../components/icon/Material'
import { commonStyles } from '../../css/styles/CommonStyles'
import {
  MySection,
  MyTextInput,
  MyTextInputPassword,
  CheckBox,
  SuccessfulSignUpDialog
} from '../../components/textinput/AccessComponents'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Wrapper from '../../components/Wrapper'
import Button from '../../components/Button/Button'
import regex from '../../config/Regex'
import AxiosInstance from '../../util/AxiosInstance'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

const SignUp = (props) => {
  // Successful dialog State
  const [isDialogVisible, setDialogVisible] = useState(false);
  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  const handlerSignUp = async () => {
    try {


      const response = await AxiosInstance.post("userApi/addUser", {
        name: name, userName: email, password: password
      })
      if (response.result) {
        setDialogVisible(!isDialogVisible)
        setTimeout(() => {
          navigation.pop(2)
        }, 2000);

      }

    } catch (error) {
      console.log("SIGN UP ERROR: ", error);
    }
  }

  // email
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(true)

  // name
  const [name, setName] = useState("")
  const [isNameValid, setIsNameValid] = useState(true)

  // password
  const [password, setPassword] = useState("")
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState("")
 
  const [isChecked, setIsChecked] = useState(false);

  const navigation = useNavigation();
    
  const checkSignUp = () => {
    const validName = regex.fullnameWithRegex.test(name);
    const validEmail = regex.emailRegex.test(email);
    const validPassword = password === confirmPassword && regex.passwordRegex.test(password);

    setIsNameValid(validName);
    setIsEmailValid(validEmail);
    setIsPasswordValid(validPassword);

    if (!validName || !validEmail || !validPassword) {
      if (!validPassword) {
        Alert.alert("ERROR", "Password doesn't match with confirm password or invalid format");
      }
      return false;
    }

    return true;
  }

  const signUp = () => {
    const isValid = checkSignUp();
    if (isValid) {
      console.log("SIGN UP SUCCESSFUL");
      handlerSignUp();
    } else {
      console.log("ERROR", "isNameValid", isNameValid, name, "isEmailValid", email.trim(), isEmailValid, "isPasswordValid", isPasswordValid);
    }
  }
  const onDialogGoBack = ()=>{
    navigation.goBack()
  }
const {t} =useTranslation()
  return (
    <Wrapper>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={[commonStyles.container, { marginTop: 40 }]}>
        <SuccessfulSignUpDialog
         onClose={toggleDialog} 
         isVisible={isDialogVisible} 
         />
        <ImageBackground resizeMode='cover' source={require('../../assets/images/logo.jpg')} style={{ height: 180 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ margin: 10 }}>
            <MetarialIcon name='arrow-back' color='black' size={30} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={[commonStyles.container, { marginTop: 40 }]}>
          <Text style={[commonStyles.title, { color: 'black', fontSize: 22 }]}>
            {t("Sign up")}
          </Text>
          <Text style={commonStyles.normalText}>
            {t("Create a new account")}
          </Text>
        </View>

        <View>
          <View style={{ flexDirection: 'row' }}>
            <MySection label={`${t("Your name")}*`} />
          </View>
          <MyTextInput
            icon={!isNameValid ? 'cancel' : 'done'}
            color={!isNameValid ? 'red' : 'black'}
            length={20} onChangeText={setName} style={{ borderColor: !isNameValid ? 'red' : 'black' }} />
          <Text style={[commonStyles.normalText, { color: !isNameValid ? 'red' : 'black', fontSize: 12, marginTop: 5.3 }]}>
            ({t("Name-required")})
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <MySection label='Email*' />
          <MyTextInput
            icon={!isEmailValid ? 'cancel' : 'done'}
            color={!isEmailValid ? 'red' : 'black'}
            onChangeText={setEmail} style={{ borderColor: !isEmailValid ? 'red' : 'black' }} />
          <Text style={[commonStyles.normalText, { color: !isEmailValid ? 'red' : 'black', fontSize: 12, marginTop: 5.3 }]}>
            ({t("Email-required")})
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <MySection label={`${t("Password")}*`} />
          <MyTextInputPassword onChangeText={(text) => setPassword(text)} style={{ borderColor: !isPasswordValid ? 'red' : 'black' }} />
          <Text style={[commonStyles.normalText, { color: !isPasswordValid ? 'red' : 'black', fontSize: 12, marginTop: 5.3 }]}>
            *{t("At least 8 characters long.")}{"\n"}
            *{t("Contains at least one uppercase letter.")}{"\n"}
            *{t("Contains at least one lowercase letter.")}{"\n"}
            *{t("Contains at least one digit.")}{"\n"}
            *{t("Contains at least one special character (e.g., !@#$%^&*).")}
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <MySection label={`${t("Confirm Password")}*`} />
          <MyTextInputPassword onChangeText={(text) => setConfirmPassword(text)} style={{ borderColor: !isPasswordValid ? 'red' : 'black' }} />
          <Text style={[commonStyles.normalText, { color: !isPasswordValid ? 'red' : 'black', fontSize: 12, marginTop: 5.3 }]}>
            ({t("Must match the password")})
          </Text>
        </View>
        <View style={{ marginTop: 30, flexDirection: 'row' }}>
            <CheckBox checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          <Text style={[commonStyles.normalText, { marginLeft: 15, marginTop: -5, opacity: isChecked ? 1 : 0.5 }]}>
            {t("sign-up-terms")}
          </Text>
        </View>
        <Button
          onPress={() => signUp()}
          title={t("Sign up").toUpperCase()}
          disabled={!isChecked}
          styleButton={{ marginBottom: 20, backgroundColor: isChecked ? 'black' : '#434343' }}
          styleText={{color:'white'}}
       />
      </KeyboardAwareScrollView>
    </Wrapper >
  )
}

export default SignUp
