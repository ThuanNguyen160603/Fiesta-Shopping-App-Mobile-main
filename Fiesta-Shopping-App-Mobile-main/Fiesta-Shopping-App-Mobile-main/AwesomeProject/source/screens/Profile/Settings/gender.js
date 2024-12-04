import React, { useContext, useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Appearance } from 'react-native';
import { MetarialIcon } from '../../../components/icon/Material';
import { POPPINS_FONT } from '../../../css/theme/Theme';
import { color } from '../../../config/ThemeAction';
import { AppContext } from '../../../util/AppContext';
import { useTranslation } from 'react-i18next';

const GenderSelection = ({ onGenderChange,gender }) => {
    
    const [selectedGender, setSelectedGender] = useState(gender);
    const isDarkMode = Appearance.getColorScheme()=="dark"
    const {theme}= useContext(AppContext)
    const handleGenderSelection = (gender) => {
        setSelectedGender(gender);
        // onGenderChange gọi hàm callback và trả giá trị gender
        onGenderChange(gender);
        console.log(isDarkMode);
    };
    useEffect(() => {
        if(gender)
            setSelectedGender(gender)
    }, [gender])
    const {t} =useTranslation()
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.genderButton, selectedGender === 'Male' ? styles.selectedButton : null]}
                onPress={() => handleGenderSelection('Male')}>
                {
                    selectedGender === 'Male' ?
                        <MetarialIcon name={'radio-button-checked'} size={13} color={isDarkMode?theme.secondary:theme.primary} />
                        : <MetarialIcon name={'radio-button-off'} size={13} color={isDarkMode?theme.primary:theme.secondary} />
                }
                <Text style={[styles.buttonText, selectedGender === 'Male' ? { color: isDarkMode?theme.secondary:theme.primary } : {color:isDarkMode?theme.primary:theme.secondary}]}>{t("Male")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.genderButton, selectedGender === 'Female' ? styles.selectedButton : null]}
                onPress={() => handleGenderSelection('Female')}>
                {
                    selectedGender === 'Female' ?
                        <MetarialIcon name={'radio-button-checked'} size={13} color={isDarkMode?theme.secondary:theme.primary} />
                        : <MetarialIcon name={'radio-button-off'} size={13} color={isDarkMode?theme.primary:theme.secondary} />
                }
                <Text style={[styles.buttonText, selectedGender === 'Female' ? { color: isDarkMode?theme.secondary:theme.primary } : {color:isDarkMode?theme.primary:theme.secondary}]}>{t("Female")}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    genderButton: {
        backgroundColor: '#fffdfd',
        borderRadius: 7,
        marginHorizontal: 5,
        alignItems: 'center',
        borderWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 7, paddingRight: 7,
        height: 32, marginTop: 10, marginRight: 10
    },
    selectedButton: {
        backgroundColor: 'black',
    },
    buttonText: {
        color: '#a9a9a9',
        paddingLeft: 5,
        fontFamily: POPPINS_FONT.medium,
        paddingTop: 3,
        fontSize: 13

    },
});

export default GenderSelection;