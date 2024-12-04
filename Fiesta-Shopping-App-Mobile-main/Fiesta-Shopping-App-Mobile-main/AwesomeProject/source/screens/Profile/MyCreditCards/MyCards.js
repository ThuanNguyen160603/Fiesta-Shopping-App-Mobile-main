import { StyleSheet, TouchableOpacity, ScrollView, Dimensions, Text, View, Animated, SafeAreaView, Alert, ToastAndroid } from 'react-native'
import React, { useRef, useCallback, useState, useEffect } from 'react'
import CreditCard from '../../../components/CreditCard/CreditCard'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PanResponder } from 'react-native'
import AxiosInstance from '../../../util/AxiosInstance'
import { useNavigation } from '@react-navigation/native'
import { styleCoProdScreen } from '../../CategoryofProductScreen/Styles'
import Icon from 'react-native-vector-icons/Ionicons';
import ShowLoadingDialog from '../../../components/LoadingDialog.js/LoadingDialog'
import { commonStyles } from '../../../css/styles/CommonStyles'
import { useSelector } from 'react-redux'
import { dataUserSelector } from '../../../redux-store'
import { useTranslation } from 'react-i18next'


export const cardHeight = 200
export const titleCardHeight = 30
export const cardPadding = 10;
const { height } = Dimensions.get("window");
const isDefault = "5698789a7fsdsdf";
const MyCards = () => {

  const [cardList, setCardList] = useState([])
  const y = useRef(new Animated.Value(0)).current;
  const [isLoading, setisLoading] = useState(false)
  const [cardDefault, setCardDefault] = useState("")
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const userData = useSelector(dataUserSelector)

  const navigation = useNavigation()

  useEffect(() => {
    setisLoading(true)
    getCardList();

    return () => {

    }
  }, [])
  useEffect(() => {
    let timeOut = null
    if (isLoading)
      timeOut = setTimeout(() => {
        console.log("Totttt");

        setisLoading(false)
      }, 1000);
    return () => {
      clearTimeout(timeOut)
    }
  }, [isLoading])

  const {t} =useTranslation()
  const Header = ({ onBack }) => {
    return (
      <View
      >
        <View style={[styleCoProdScreen.header, { alignItems: 'center', justifyContent: 'flex-start' }]}>

          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { console.log("back"); onBack(); }}>
            <Icon name="arrow-back-circle" color={"black"} size={50} />

          </TouchableOpacity>
          <Text style={[commonStyles.normalText, { fontSize: 20, fontWeight: 'bold', marginLeft: "5%" }]}>{t("Visa card list").toUpperCase()}</Text>
        </View>
      </View>
    )
  }
  const getCardList = async () => {
    try {
      const response = await AxiosInstance.get(`payment/get-card-list/${userData._id}`)
      if (response.statusCode == 200) {
        console.log(response.data);

        setCardList(response.data)
        setCardDefault(response.defaultCard || "")
      }
      else
        Alert.alert("Error", "Error get card list or no available card list !!!")
    } catch (error) {
      console.log("ERROR GET CARD LIST: " + error);
    }
  }
  const onDeleteCard = async (paymentMethodId) => {
    try {
      const response = await AxiosInstance.post(`payment/delete-card?userId=${userData._id}&paymentMethodId=${paymentMethodId}`)
      console.log(response.data);
      if (response.statusCode == 200) {
        ToastAndroid.show("Delete the card successfully!!!", ToastAndroid.SHORT)
        const newCardList = cardList.filter((item) => { return item.id !== paymentMethodId })
        console.log(JSON.stringify(newCardList));
        setCardList(newCardList)
      }
      else
        Alert.alert("Error", "Error get card list !!!")
    } catch (error) {
      console.log("ERROR GET CARD LIST: " + error);

    }
  }
  useEffect(() => {
    if (cardDefault)
      swapCard()
    console.log(cardDefault);


  }, [cardDefault])

  const swapCard = () => {
    const newCardList = [...cardList]
    for (let index = 0; index < newCardList.length; index++) {
      const item = newCardList[index]
      if (item.id == cardDefault) {
        let temp = item
        newCardList[index] = newCardList[newCardList.length - 1]
        newCardList[newCardList.length - 1] = temp

      }
    }
    setCardList(newCardList)
    console.log("SWAPPPP ", newCardList, cardDefault);

  }
  const onDefaultCard = async (paymentMethodId) => {
    try {
      const response = await AxiosInstance.post(`payment/choose-default-card?userId=${userData._id}&paymentMethodId=${paymentMethodId}`)
      console.log(response);
      if (response.statusCode == 200) {
        ToastAndroid.show("Choose the default card successfully!!!", ToastAndroid.SHORT)
        setCardDefault(paymentMethodId)
        // Choose default payment method in defaultCard
        await AsyncStorage.setItem("PaymentMethod", "Visa")

      }
      else
        Alert.alert("Error", "Error get card list !!!")
    } catch (error) {
      console.log("ERROR GET CARD LIST: " + error);

    }
  }

  const translateYs = cardList.map((item, i) => {
    const inputRange = [-cardHeight, 0];
    const outputRange = [
      cardHeight * i,
      (cardHeight - titleCardHeight) * -i
    ];
    if (i > 0) {
      inputRange.push(cardPadding * i);
      outputRange.push((cardHeight - 180) * i);
    }
    return y.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp",
    });
  });
  //  Wallet animation
  // const y = new Animated.Value(0)
  const handleScroll = event => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    // Check if scroll has reached the bottom
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height) {
      setIsScrolledToEnd(true);
      console.log("Scrolled to the end!");
    } else {
      setIsScrolledToEnd(false);
    }
  };
  return (
    <GestureHandlerRootView>
      {
        isLoading ?
          <ShowLoadingDialog isLoading={isLoading} setIsLoading={setisLoading} />
          :
          <Animated.ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            decelerationRate={'normal'}
            scrollEnabled={cardList.length > 3}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y }
                  }
                }
              ],
              { useNativeDriver: true,listener:handleScroll }
            )}
          >
            <Header onBack={() => {
              if (navigation.canGoBack) navigation.goBack();
            }} />
            <View>
              {
                cardList.length > 0 ? cardList.map((item, i) => (
                  <Animated.View
                    key={item.fingerprint}
                    style={{
                      transform: [{ translateY: translateYs[i] }],
                    }}
                  >
                    <CreditCard
                      front={true}
                      name={item.name}
                      cardName={item.brand}
                      styleCreditCard={{
                        marginHorizontal: 20,
                        width: 370 - ((cardList.length - i) * 4),
                        alignSelf: 'center'
                      }}
                      onRightButton={() => onDeleteCard(item.id)}
                      onLongPress={() => onDefaultCard(item.id)}
                      accountNum={"XXXX XXXX XXXX " + item.last4}
                      expiredDate={item.exp_month + '/' + item.exp_year}
                      onSwipeable={(cardList.length - 1 == i)||isScrolledToEnd}
                    />
                  </Animated.View>
                )) : <Text
                  style={[{
                    alignSelf:'center',
                    marginTop:'80%'
                  }]}
                >{t("No available cards")}</Text>
              }
            </View>
          </Animated.ScrollView>
      }
    </GestureHandlerRootView>
  );
}

export default MyCards

const styles = StyleSheet.create({
  cardItem: {
    marginHorizontal: 20,
  },
  content: {
    height: height + cardHeight + 150,
    marginTop: 20,
    paddingBottom: 100
  },

})
