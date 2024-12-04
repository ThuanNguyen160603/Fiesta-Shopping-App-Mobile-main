import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { MetarialIcon } from "../icon/Material";
import { commonStyles } from "../../css/styles/CommonStyles";
import { AppStyles } from "../../css/styles/CommonStyles";
import { FONTS } from "../../assets/Constants";
import { POPPINS_FONT } from "../../css/theme/Theme";
import { useTranslation } from "react-i18next";
export const SearchTextView = ({ onFirstTap,height, width, text, borderWidth, backGroundColor,onSubmitText }) => {
    
    const {t}=useTranslation()
    return (
        <View style={{ borderWidth: borderWidth, borderRadius: 30, borderColor: '#bcbcbcff', width: width, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, height: 50, backgroundColor: backGroundColor }}>
            <MetarialIcon name='search' size={28} color='#898989' />
            <TextInput
                onSubmitEditing={(e)=>onSubmitText(e.nativeEvent.text)}
                onPressIn={()=>{if(typeof onFirstTap!== 'undefined') onFirstTap()}}
                defaultValue={text}
                placeholder={`${t("Search")}...`}
                style={{ textAlignVertical: 'top',fontSize: 15, fontFamily: POPPINS_FONT.regular, textAlignVertical: 'bottom', width: "80%", paddingLeft: 10 }} />
        </View>
    )
}