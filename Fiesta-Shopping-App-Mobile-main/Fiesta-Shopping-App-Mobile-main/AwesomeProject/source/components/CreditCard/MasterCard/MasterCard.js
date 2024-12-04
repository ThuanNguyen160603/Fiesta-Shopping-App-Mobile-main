import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { CardStyles } from '../styles'
import { VietzBankCardStyles } from './styles'
import { commonStyles } from '../../../css/styles/CommonStyles'
import cutStringIntoEqualParts from '../AccountNumArgo'
import { useTranslation } from 'react-i18next'

const MasterCard = ({ name, accountNum, expiredDate, style, front, CVV }) => {
  const { t } = useTranslation();

  
  return (
    <View>
      <ImageBackground
        borderRadius={10}
        source={require('../Background/MasterCard.png')}
        style={[CardStyles.CardViewStyle, style]}>
        {
          front ? (
            <>
              <View style={[CardStyles.textStyle, VietzBankCardStyles.ViewInfo]}>
                <Text
                  style={[commonStyles.normalText, VietzBankCardStyles.text, { color: 'white', fontStyle: 'italic' }]}
                >{t("Account Number")}</Text>
                <Text
                  style={[CardStyles.accountNumStyle, VietzBankCardStyles.Info]}
                >{accountNum?cutStringIntoEqualParts(accountNum, 4):""}</Text>
                <Text
                  style={[commonStyles.normalText, VietzBankCardStyles.text, { color: 'white', fontStyle: 'italic' }]}
                >{t("Name")}</Text>
                <Text
                  style={[CardStyles.nameStyle, VietzBankCardStyles.Info]}
                >{name}</Text>
              </View>
              <Text
                style={[CardStyles.expiredDateStyle, VietzBankCardStyles.expiredDateStyle, VietzBankCardStyles.text]}
              >{t("Expired Date")}: {expiredDate}</Text>
            </>
          ) : (
            <View style={CardStyles.CardViewStyle}>
              <View style={[CardStyles.lineCardBack, CardStyles.textStyle, { backgroundColor: 'white',opacity:0.6 }]}>
                <Text
                  style={[CardStyles.accountNumStyle, { color: 'white', textAlign: 'center', fontSize: 24 }]}
                >{accountNum?cutStringIntoEqualParts(accountNum, 4):""}</Text>
              </View>

              <View style={[CardStyles.cardBack, CardStyles.expiredDateStyle, { bottom: 5 }]}>
                <Text
                  style={[CardStyles.nameStyle, { marginTop: 0, color: 'white', fontWeight: 'bold', fontStyle: 'italic' }]}
                >CVV: </Text>
                <Text
                  style={[CardStyles.nameStyle, CardStyles.textStyle, { marginLeft: 5, textAlign: 'center', }]}
                >{CVV}</Text>
              </View>

            </View>
          )
        }
      </ImageBackground>
    </View>
  )
}

export default MasterCard