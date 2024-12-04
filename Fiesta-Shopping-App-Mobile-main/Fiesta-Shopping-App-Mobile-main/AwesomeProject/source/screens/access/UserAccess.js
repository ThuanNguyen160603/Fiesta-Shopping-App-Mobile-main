import { View, Text, ImageBackground, StatusBar, TextInput, TouchableOpacity, BackHandler } from 'react-native'
import React, { useContext } from 'react'
import { commonStyles } from '../../css/styles/CommonStyles'
import { AppStyles } from '../../css/styles/CommonStyles'
import { AppContext } from '../../util/AppContext'
import Button from '../../components/Button/Button'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
const backGround = { uri: 'http://images.unsplash.com/photo-1606164510427-0dff1bcb27d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwwfHwwfHx8MA%3D%3D' }
const UserAccess = (props) => {
    const {t} = useTranslation("")
    const { navigation } = props;
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
    return (
        <ImageBackground style={[{ height: '100%' }, commonStyles.container]} source={backGround}>
            <StatusBar backgroundColor='#000000' />
            <View style={AppStyles.styleUserAccess.view}>
                <Text style={commonStyles.title}>Fashion Fiesta</Text>
                <Text numberOfLines={3} style={[commonStyles.normalText, { color: 'white' }]}>
                    "{t("lorem isum")}"
                </Text>
            </View>
            <View style={[commonStyles.viewBtnAccess, { marginTop: 300 }]}>
                {/* <TouchableOpacity
                onPress={() => navigation.navigate('Login')} 
                style={commonStyles.btnAccess_light}>
                    <Text style={commonStyles.textBtnAccess_light}>Login</Text>
                </TouchableOpacity> */}
                <Button
                    onPress={() => navigation.navigate('Login')}

                    title={t("Sign in")}
                    styleButton={{ backgroundColor: 'black', borderColor: 'transparent' }}
                    styleText={{ color: 'white' }}
                />
                <Button
                    onPress={() => navigation.navigate('SignUp')}

                    title={t("Sign up")}
                    styleButton={{ backgroundColor: 'white' }}
                    styleText={{ color: 'black' }}
                />

             
            </View>
        </ImageBackground>
    )
}

export default UserAccess