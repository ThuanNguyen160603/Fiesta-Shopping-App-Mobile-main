import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
export const FontAwesomeIcon = ({ name, size, color }) => {
    {
        return (
            <Icon name={name} color={color} size={size} />
        )
    }
}
export const onFocuseFontAwesomeIcon = ({ name, size, color }) => {
    {
        return <View style={{ backGroundColor: 'red', boderRadius: 20, width: 50 }}>
            <Icon name={name} color={color} size={size} />
        </View>
    }
}