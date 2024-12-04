import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import dialogStyle from './style'
import { commonStyles } from '../../css/styles/CommonStyles'
import StyleProfile from '../../screens/Profile/styles'
/**
* Component gợi ý props.
* @param {{
    *    styleTitle:Styles,
    *   styleImage:Styles,
    *   buttonStyle:Styles,
    * styleMessage:Styles,
    *   styleButtonName:Styles,
    *    title:string,
    *    image:string,
*       message:string,
    *    dialogFunction:function
    },
    *    buttonName:string
    * }} props - Props của component.
    */
const Dialog = ({ message,styleMessage,title, styleTitle, image, styleImage, dialogFunction, buttonStyle, buttonName, styleButtonName, isClosed, style }) => {

       const  IMAGE = require('../../assets/images/successful.gif')
       
       
    return (
        <Modal
            onRequestClose={isClosed}
            animationType={"fade"}
            transparent={false}
            visible={isClosed}
            style={{ display: isClosed ? 'flex' : 'none' }}
        >
            <View style={[dialogStyle.modal,StyleProfile.shadow]}>
                <Text style={[commonStyles.normalText, styleTitle]}>{title}</Text>
                <Image source={typeof image!= 'undefined'&&image.length>0?{uri:image}:IMAGE} style={[styleImage]}/>
                <Text style={[commonStyles.normalText,styleMessage]}>{message}</Text>
                <TouchableOpacity style={[commonStyles.btnAccess_dark, buttonStyle]} onPress={() => dialogFunction()}>
                    <Text style={[commonStyles.textBtnAccess_dark, styleButtonName]}>{buttonName}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default Dialog