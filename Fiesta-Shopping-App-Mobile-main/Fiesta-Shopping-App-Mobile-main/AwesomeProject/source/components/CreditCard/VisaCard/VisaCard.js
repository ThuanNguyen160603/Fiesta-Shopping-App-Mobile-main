import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { BIDVCardStyles } from './styles'
import { CardStyles } from '../styles'
import { commonStyles } from '../../../css/styles/CommonStyles'
import { Animated } from 'react-native'
import cutStringIntoEqualParts from '../AccountNumArgo'
import { useTranslation } from 'react-i18next'
const VisaCard = ({ name, accountNum, expiredDate, style, front, CVV }) => {
const {t} = useTranslation()

  return (
    <ImageBackground
      borderRadius={10}
      source={require('../Background/VisaCard.png')}
      style={[CardStyles.CardViewStyle, style]}>
      {
        front ? (
          <>
            <View style={[CardStyles.textStyle, BIDVCardStyles.ViewInfo]}>
              <Text
                style={[commonStyles.normalText, { color: 'white', fontStyle: 'italic' }]}
              >{t("Account Number")}</Text>
              <Text
                style={[CardStyles.accountNumStyle, BIDVCardStyles.Info]}
              >{cutStringIntoEqualParts(accountNum,4)}</Text>
              <Text
                style={[commonStyles.normalText, { color: 'white', fontStyle: 'italic' }]}
              >{t("Name")}</Text>
              <Text
                style={[CardStyles.nameStyle, BIDVCardStyles.Info]}
              >{name}</Text>
            </View>
            <Text
              style={[CardStyles.expiredDateStyle]}
            >{t("Expired Date")}: {expiredDate}</Text>
          </>
        ) : (
          <View style={CardStyles.CardViewStyle}>
            <View style={[CardStyles.lineCardBack,CardStyles.textStyle, { backgroundColor: 'white' }]}>
              <Text
                style={[CardStyles.accountNumStyle,{padding:accountNum?0:10,color:'black',textAlign:'center',fontSize:24}]}
              >{cutStringIntoEqualParts(accountNum,4)}</Text>
            </View>

            <View style={[CardStyles.cardBack, CardStyles.expiredDateStyle, { bottom: 5 }]}>
              <Text
                style={[CardStyles.nameStyle, { paddingBottom:CVV?0:10,marginTop: 1, color: 'white', fontWeight: 'bold', fontStyle: 'italic' }]}
              >CVV:</Text>
              <Text
                style={[CardStyles.nameStyle, CardStyles.textStyle, { marginLeft: 5, alignSelf: 'center', }]}
              >{CVV}</Text>
            </View>

          </View>
        )
      }
    </ImageBackground>
  )
}

export default VisaCard;