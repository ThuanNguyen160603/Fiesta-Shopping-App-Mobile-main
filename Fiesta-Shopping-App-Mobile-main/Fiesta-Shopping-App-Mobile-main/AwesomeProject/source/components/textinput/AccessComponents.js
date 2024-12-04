import React, { useContext, useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { commonStyles } from "../../css/styles/CommonStyles";
import { POPPINS_FONT } from "../../css/theme/Theme";
import { FoundationIcon } from "../icon/Foundation";

import { MetarialIcon } from "../icon/Material";
import { FontAwesomeIcon } from "../icon/FontAwesome";
import cutStringIntoEqualParts from "../CreditCard/AccountNumArgo";
import { color } from "../../config/ThemeAction";
import { AppContext } from "../../util/AppContext";
import Button from "../Button/Button";
export const MySection = ({ label }) => {
    const { theme } = useContext(AppContext)
    return <Text style={[styles.section, { color: theme.secondary }]}>{label}</Text>
}

export const MyTextInput = ({ placeholder, length, onChangeText, style, icon, color }) => {
    const { theme } = useContext(AppContext)

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.textInput, style, { color: 'black' }]}
                textAlignVertical="bottom"
                placeholder={placeholder}
                maxLength={length}
                onChangeText={onChangeText}

            />
            <View style={styles.icon}>
                <MetarialIcon name={icon ?? 'done'} size={20} color={color ?? 'black'} />
            </View>
        </View>
    )
}

export const MyTextInputPassword = ({ placeholder, length, onChangeText, style }) => {
    const [isVisible, setisVisible] = useState(true)
    const handlerIcon1 = () => {
        setisVisible(!isVisible)
    }
    return (
        <View style={styles.container}>
            <TextInput style={[styles.textInput, { color: 'black' }]}
                textAlignVertical="bottom"
                secureTextEntry={isVisible}
                placeholder={placeholder}
                maxLength={length}
                onChangeText={onChangeText}
            />
            <TouchableOpacity onPress={handlerIcon1} style={styles.icon}>
                <MetarialIcon name={isVisible === true ? 'visibility-off' : 'visibility'} size={20} color='black' />
            </TouchableOpacity>
        </View>
    )
}

export const SocialSignInButton = ({ label, iconName, iconColor, backgroundColor, labelColor, iconSize, borderColor, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[

                styles.btnSocialContainer,
                { backgroundColor: backgroundColor, borderWidth: 1, borderColor: borderColor }]}>
            <FontAwesomeIcon name={iconName} size={iconSize} color={iconColor} />
            <Text style={[{ marginStart: 20, fontSize: 16, fontWeight: 'bold', color: labelColor }]}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export const LineWithTextBetween = () => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '100%', height: 1.5, opacity: 0.3, marginTop: 15, marginBottom: 15, backgroundColor: '#c3c3c3' }} />
            <Text style={{
                fontSize: 15, backgroundColor: 'white',
                marginLeft: -190, marginTop: 4, width: 25, textAlign: 'center', fontFamily: POPPINS_FONT.regular
            }}>
                or
            </Text>
        </View>
    )
}

export const CheckBox = ({ checked, styleCheckBox, onChange, isDisable }) => {


    return (
        <TouchableOpacity
            disabled={isDisable ? isDisable : false}
            activeOpacity={0.2}
            onPress={() => onChange(!checked)}
            style={[{ backgroundColor: 'white', borderWidth: 1, borderRadius: 3, width: 17, height: 17, opacity: checked === true ? 1 : 0.5 }, styleCheckBox]}
        >
            {
                checked === true ? <View style={{ backgroundColor: '#000000', width: 15, height: 15 }}>
                    <MetarialIcon name='done' size={14} color='white' />
                </View> : <View />
            }
        </TouchableOpacity>
    )
}

export const SuccessfulSignUpDialog = ({ isVisible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={[commonStyles.container, { backgroundColor: 'white', height: '100%', alignItems: 'center' }]}>
                {/* View này là view tổng */}
                <View style={{ marginTop: 230, width: '80%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 50, borderWidth: 4, borderColor: '#65BA67', width: 43 }}>
                        <MetarialIcon name='done' color='#65BA67' size={35} />
                    </View>

                    <Text style={[commonStyles.title, { color: 'black', fontSize: 25, marginTop: 35 }]}>
                        Successful!
                    </Text>
                    <Text style={[commonStyles.normalText, { textAlign: 'center' }]}>
                        You have successfully registered in out app and start working on it.
                    </Text>
                </View>
              

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    section: {

        fontFamily: POPPINS_FONT.bold,
        fontSize: 15
    },
    textInput: {
        backgroundColor: 'white',
        borderBottomWidth: 0.2,
        height: 30,
        marginTop: -8,
        width: '100%',
        fontSize: 17,
        paddingBottom: -5,
        paddingLeft: -5
    },
    container: {
        flexDirection: 'row'
    },
    icon: {
        position: 'absolute',
        right: 0
    },
    btnSocialContainer: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: 350,
        borderRadius: 30,
        justifyContent: 'center'
    }
})