import { View, Text, Image, Switch, TouchableOpacity, ScrollView, Appearance, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AppStyles } from '../../../css/styles/CommonStyles';
import { commonStyles } from '../../../css/styles/CommonStyles';
import { MySection } from '../../../components/textinput/AccessComponents';
import { MetarialIcon } from '../../../components/icon/Material';
import { InfoDisplayWithLabel } from '../../../components/InfoDisplay/View';
import { POPPINS_FONT } from '../../../css/theme/Theme';
import GenderSelection from './gender';
import { FoundationIcon } from '../../../components/icon/Foundation';
import { StyleSettingScreen } from './styles';
import { FontAwesomeIcon } from '../../../components/icon/FontAwesome';
import { ToggleButton } from './ToggleButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../../util/AppContext';
import { color } from '../../../config/ThemeAction';
import Wrapper from '../../../components/Wrapper';
import Button from '../../../components/Button/Button';
import regex from '../../../config/Regex';
import { launchImageLibrary } from 'react-native-image-picker';
import AxiosInstance from '../../../util/AxiosInstance';
import Header from '../../../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { dataUserSelector, setUserData } from '../../../redux-store';
import ImageDisplayModal from '../../../components/ImageDisplayModal/ImageDisplayModal';
import { useTranslation } from 'react-i18next';


const SettingScreen = () => {
    const { theme } = useContext(AppContext);
    const userData = useSelector(dataUserSelector)
    setGender
    // Gender handler...
    const [gender, setGender] = useState(null);

    // User's data 
    const [name, setName] = useState(userData.name);
    const [isNameValid, setIsNameValid] = useState(true);

    const [email, setEmail] = useState(userData.userName);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

    const dispatch = useDispatch()
    const [image, setNewImage] = useState(null);
    const [orgImage, setOrgImage] = useState(userData.image);
    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
    };

    // Dark mode handler...
    const [onNotification, setOnNotification] = useState(false);
    const NotificationChange = (selectedCurrentMode) => {
        setOnNotification(selectedCurrentMode);
    };
    const [visibleModal, setVisibleModal] = useState(false)
    const navigation = useNavigation()
    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none'
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'flex',
                backgroundColor: "white", position: 'absolute', borderTopLeftRadius: 30,
                borderTopRightRadius: 30, height: 70, paddingLeft: 30, paddingRight: 30,
            }
        });
    }, [navigation]);
    const getImageFromLibrary = async () => {
        try {

            const result = await launchImageLibrary()

            if (result.assets)
                setNewImage(result.assets[0])
        } catch (error) {
            console.log("ERROR LIBRARY: ", error);
        }
    }
    useEffect(() => {
      console.log(userData);
      
    
      return () => {
        
      }
    }, [userData])
    
    useEffect(() => {
        (async () => {
            const response = await AxiosInstance.get(`userApi/getUserInfo/${userData._id}`)
            if (response.user) {
                const data = response.user;
                dispatch(setUserData(data))
            }
        })()

        return () => {

        }
    }, [])

    const updateUser = async () => {
        let updateData = validateInfo();
        const data = new FormData();
        if (image !== null) {
            data.append('images', {
                name: image.fileName,
                type: image.type,
                uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
            });
            updateData = { ...updateData, image: { url: image.fileName, id: userData.image ? userData.image.id : "" } }
            
        }

        data.append("updateFields", JSON.stringify(updateData))
        console.log(JSON.stringify(data),image);
        
        try {   
            const response = await AxiosInstance.post(`userApi/updateUser/${userData._id}`, data, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            
            if (response.result){
                console.log("UPDATE SUCCESSFUL");
                setNewImage(null)
                dispatch(setUserData(response.data))
            }
        } catch (error) {
            console.log("UPDATE ERROR: ",error);
            
        }
        
    }
    const validateInfo = () => {
        let data = {}
        if (regex.fullnameWithRegex.test(name) && name.length > 0)
            data = { ...data, name: name }
        else Alert.alert('Invalid name !!!', name + name.length + regex.fullnameWithRegex.test(name))

        if (regex.emailRegex.test(email) && email.length > 0)
            data = { ...data, userName: email }
        else Alert.alert('Invalid email !!!', email + email.length + regex.emailRegex.test(email))

        if (regex.phoneNumber.test(phoneNumber) && phoneNumber.length > 0)
            data = { ...data, phoneNumber: phoneNumber }
        if (gender)
            data = { ...data, gender: gender }

        return data
    }
    const onBack = () => {
        navigation.goBack()
    }
    const {t} = useTranslation()
    return (
        <Wrapper>
            {
                userData.image && <ImageDisplayModal imageArray={[userData.image]} index={0} visible={visibleModal} onClose={()=>setVisibleModal(false)}/>
            }
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView>
                    <Header name={t("Personal Detail")} onBack={onBack} />
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                        <TouchableOpacity
                            onPress={() => setVisibleModal(true)}
                            style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <Image style={{ width: 80, height: 80, borderRadius: 18 }} source={image ? { uri: image.uri } : userData.image ? { uri: userData.image.url } : require('../../../assets/images/avatar-male.png')} />
                            <TouchableOpacity
                                onPress={() => getImageFromLibrary()}
                                style={{ backgroundColor: theme.secondary, elevation: 5, borderRadius: 5, padding: 2, width: 22, height: 22, bottom: -4, position: 'absolute', right: -4 }}>
                                <MetarialIcon name={'edit'} size={17} color={theme.primary} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <MySection label={t('Upload image')} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <InfoDisplayWithLabel label={t("Your name")} info={userData.name} onChangeText={setName} />
                        <Text style={[commonStyles.normalText, { color: !isNameValid ? 'red' : 'black', fontSize: 12, marginTop: 5.3 }]}>
                            ({t("Name-required")})
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <Text style={{ fontFamily: POPPINS_FONT.medium, fontSize: 16, opacity: 0.7, marginRight: 30, color: theme.secondary }}>Gender</Text>
                            <GenderSelection onGenderChange={handleGenderChange} gender={userData.gender} />
                        </View>
                        <InfoDisplayWithLabel placeholder={t('email-placeholder')} label={"Email"} info={userData.userName} onChangeText={setEmail} />
                        {!isEmailValid && (
                            <Text style={[commonStyles.normalText, { color: 'red', fontSize: 12, marginTop: 5.3 }]}>
                                ({t("Email-required")})
                            </Text>
                        )}
                        <InfoDisplayWithLabel placeholder={t("phone-number-placeholder")} label={t("PhoneNumber")} info={userData.phoneNumber} onChangeText={setPhoneNumber} />
                        {!isPhoneNumberValid && (
                            <Text style={[commonStyles.normalText, { color: 'red', fontSize: 12, marginTop: 5.3 }]}>
                                ({t("Enter a valid phone number")})
                            </Text>
                        )}
                    </View>
                    <View style={[StyleSettingScreen.viewOption, { width: "100%" }]}>
                        <Button
                            onPress={() => updateUser()}
                            title={t("Update")}
                            styleButton={{ backgroundColor: theme.secondary, width: '45%' }}
                            styleText={{ color: theme.primary }}
                        />
                        <Button
                            title={t("Reset")}
                            styleButton={{ backgroundColor: theme.tertiary, width: '45%' }}
                            styleText={{ color: theme.secondary }}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <MySection label={t('Settings')} />
                        <View style={[StyleSettingScreen.viewMenu, { borderColor: theme.borderColor, backgroundColor: '#dddddd' }]}>
                            {/* <View style={StyleSettingScreen.viewOption}>
                                <View style={StyleSettingScreen.viewTitle}>
                                    <View style={[StyleSettingScreen.viewIcon, { backgroundColor: theme.secondary, borderRadius: 8 }]}>
                                        <FontAwesomeIcon name={'globe'} size={22} color={theme.primary} />
                                    </View>
                                    <MySection label={'Language'} />
                                </View>
                                <View style={StyleSettingScreen.viewStatus}>
                                    <Text style={[commonStyles.normalText, { color: theme.secondary, marginTop: 4, fontSize: 11 }]}>
                                        English
                                    </Text>
                                    <MetarialIcon name={'navigate-next'} color={theme.secondary} size={23} />
                                </View>
                            </View> */}
                            <View style={StyleSettingScreen.viewOption}>
                                <View style={StyleSettingScreen.viewTitle}>
                                    <View style={[StyleSettingScreen.viewIcon, { backgroundColor: theme.secondary }]}>
                                        <MetarialIcon name={'notifications'} size={22} color={theme.primary} />
                                    </View>
                                    <MySection label={t('Notification')} />
                                </View>


                                <ToggleButton value={onNotification} currentMode={NotificationChange} />

                            </View>
                            <View style={StyleSettingScreen.viewOption}>
                                <View style={StyleSettingScreen.viewTitle}>
                                    <View style={[StyleSettingScreen.viewIcon, { backgroundColor: theme.secondary, borderRadius: 8 }]}>
                                        <MetarialIcon name={'help'} size={22} color={theme.primary} />
                                    </View>
                                    <MySection label={t('Help Center')} />
                                </View>
                                <View style={StyleSettingScreen.viewStatus}>
                                    <View />
                                    <MetarialIcon name={'navigate-next'} color={'black'} size={23} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Button
                            title={t("Log out")}
                            styleButton={{ backgroundColor: theme.secondary, marginBottom: 20 }}
                            styleText={{ color: theme.primary }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </Wrapper>
    );
}

export default SettingScreen;
