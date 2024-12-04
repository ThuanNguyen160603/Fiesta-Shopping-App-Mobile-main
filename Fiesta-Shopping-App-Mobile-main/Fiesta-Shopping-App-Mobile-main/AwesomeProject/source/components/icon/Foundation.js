import Icon from "react-native-vector-icons/Foundation";
import { View, Text, StyleSheet, Easing } from "react-native";
import { POPPINS_FONT } from "../../css/theme/Theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import { useEffect, useRef,useCallback, useContext } from "react";
import { AppContext } from "../../util/AppContext";
import { useTranslation } from "react-i18next";
export const FoundationIcon = ({ name, size, color }) => {
    {
        return (
            <Icon name={name} color={color} size={size} />
        )
    }
}
export const FocusedFoundationIcon = ({ name, size, color, label, focused }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const spinAnimationValue = useRef(new Animated.Value(0)).current;
    const {theme} =useContext(AppContext)
    const navigation= useNavigation();
    const otherAnimation = Animated.timing(animatedValue, {
        toValue: 95,
        duration: 400,
        useNativeDriver: false,
    });
    const spin = spinAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    // const animatedRotateValue = useRef(new Animated.Value(0)).current;
    // // animation quay tròn
    const spinAnimation =
        Animated.timing(spinAnimationValue, {
            toValue: 1,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        })
        // First set up animation 
        
        // Next, interpolate beginning and end values (in this case 0 and 1)
     
    // animation trượt từ trái sang
    useFocusEffect(
        useCallback(() => {
            spinAnimation.start();
            otherAnimation.start();
          return () => {
            spinAnimation.reset();
            otherAnimation.reset()
           
    
          };
        }, [])
      );
      const {t} = useTranslation()
    return (
        <View style={styles.bgIconFocused}>
            <Animated.View
                style={[styles.viewIconFocused,
                // {transform:[{rotate:spin}]}
                ]}>
                <Icon name={name} color={color} size={size} style={{borderRadius:200}} />
            </Animated.View >
            <Animated.View style={{ zIndex: 0, width: animatedValue, backgroundColor: '#b1b1b1', marginLeft: -35, borderRadius: 30, padding: 5 }}>
                <Text style={[styles.label,{color:'black'}]} numberOfLines={1}>{t(label)}</Text>
            </Animated.View>
        </View>
    )
}


export const RenderIcon = ({ name, size, color, label, focused }) => {

    return focused === 'false' ? <FocusedFoundationIcon name={name} size={size} color={color} label={label} /> : <FoundationIcon name={name} size={size} color={color} />

}


const styles = StyleSheet.create({
    viewIconFocused: {
        backgroundColor: 'black',
        width: 50,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: 'center',
         padding: 8, marginLeft: 0, zIndex: 1
    },
    bgIconFocused: {
       borderRadius: 20, width: 'auto', paddingRight: 5,
        borderRadius: 100, flexDirection: 'row', alignItems: 'center'
    },
    label: {
        fontFamily: POPPINS_FONT.black,
        fontSize: 13,
        paddingTop: 5, paddingRight: 3, marginLeft: 37
    }
})