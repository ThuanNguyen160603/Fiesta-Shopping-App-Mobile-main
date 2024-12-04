import { View, Text, Animated } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import { AppStyles } from '../../../css/styles/CommonStyles'
import { commonStyles } from '../../../css/styles/CommonStyles'
import { MetarialIcon } from '../../../components/icon/Material'
import { TouchableOpacity } from 'react-native'
import { color } from '../../../config/ThemeAction'
import { AppContext } from '../../../util/AppContext'
export const ToggleButton = ({ value, currentMode }) => {
    const [isEnabled, setisEnabled] = useState(value ?? false);
    const animatedValue = useRef(new Animated.Value(0)).current;
   
    const {theme}= useContext(AppContext)
    const otherAnimation = Animated.timing(animatedValue, {
        toValue: isEnabled === false ? 0 : 13,
        duration: 200,
        useNativeDriver: false,
    });

    const isEnabledHandler = (isEnabled) => {
        currentMode(isEnabled)
    }
    useEffect(() => {
        isEnabledHandler(isEnabled)
        otherAnimation.start();
    }, [isEnabled])

    const doneWorkChangeMode = () => {
        setisEnabled(!isEnabled)
    }
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>doneWorkChangeMode()}
            style={{ padding: 2, backgroundColor: theme.primary, width: 30, borderRadius: 10 }}>
            <Animated.View style={{ marginLeft: animatedValue }}>
                <MetarialIcon name={'fiber-manual-record'} color={theme.secondary} size={13} />
            </Animated.View>
        </TouchableOpacity>
    )
}

