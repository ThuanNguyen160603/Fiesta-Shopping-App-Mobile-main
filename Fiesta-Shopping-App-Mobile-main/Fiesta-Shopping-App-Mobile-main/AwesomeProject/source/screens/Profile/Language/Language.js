import { View, Text, TouchableOpacity, ToastAndroid, Modal } from 'react-native'
import React, { useEffect, useState, useTransition } from 'react'
import { commonStyles } from '../../../css/styles/CommonStyles'
import Wrapper from '../../../components/Wrapper';
import i18next, { languageResources } from '../../../../services/i18next'
import LanguageList from '../../../../services/languageList.json'
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-ico-flags';
import { MetarialIcon } from '../../../components/icon/Material';
import styleModalLanguage from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '../../../components/icon/FontAwesome';
import CountryFlag from 'react-native-country-flag';
const Language = ({ navigation, open, setOpened }) => {

  const { t } = useTranslation();
  const [defaultLanguage, setDefaultLanguage] = useState("jfs")
  const changeLanguage = async (lng) => {
    i18next.changeLanguage(lng)
      .then(() => setDefaultLanguage(lng))
      .then(async () => await AsyncStorage.setItem("default-language", lng))
      .catch(error => console.log("Error:", error));
    const defaultLanguageFromStorage = await AsyncStorage.getItem("default-language")
    console.log(defaultLanguageFromStorage + "  Asucojsjif");
  }

  useEffect(() => {
    const checkLanguage = async () => {
      const defaultLanguageFromStorage = await AsyncStorage.getItem("default-language")
      if (defaultLanguageFromStorage !== null) {
        setDefaultLanguage(defaultLanguageFromStorage);

      } else {
        setDefaultLanguage("en");
      }
    }
    checkLanguage();
    return () => {

    }
  }, [])

  return (
    <View>
      <Modal
        transparent={true}
        visible={open} onRequestClose={() => setOpened(false)}>
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 80 }}>
          <View style={styleModalLanguage.modal} >
            <TouchableOpacity activeOpacity={0.5} style={styleModalLanguage.Icon} onPress={() => setOpened(false)}>
              <MetarialIcon size={30} name='cancel' color={"black"} />
            </TouchableOpacity>
            <Text style={[commonStyles.title, { padding: 10, color: 'black', fontSize: 22, textAlign: 'center' }]}>{t('change-language')}</Text>

            <View  >

              {Object.keys(languageResources).map(item => (
                <TouchableOpacity key={item} onPress={() => changeLanguage(item)}>
                  <View style={styleModalLanguage.cardLanguage}>
                    <View style={styleModalLanguage.insideCard}>
                      <CountryFlag style={{borderRadius:10,marginRight:5}} size={50} isoCode={LanguageList[item].isoCode}/>
                      {/* <Icon name= height="50" width="50" /> */}
                      <Text style={[commonStyles.normalText, { marginLeft: 10, fontWeight: 'bold', fontSize: 18 }]}  >{LanguageList[item].nativeName}</Text>
                    </View>
                    {(defaultLanguage === item) ?
                      <View style={{
                        alignSelf: 'center',
                        justifyContent: 'flex-end'
                      }}>
                        <FontAwesomeIcon name={'check'} size={25} color={'black'} />
                      </View>
                      : <View />}

                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Language