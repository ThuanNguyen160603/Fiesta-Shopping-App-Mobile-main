import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView, ToastAndroid, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker'
import { styleCoProdScreen } from '../../CategoryofProductScreen/Styles'
import { commonStyles } from '../../../css/styles/CommonStyles';
import CreditCard from '../../../components/CreditCard/CreditCard';
import { cardHeight, titleCardHeight, cardPadding } from './MyCards';
import Dialog from '../../../components/Dialog/Dialog';
import dialogStyle from '../../../components/Dialog/style';
import { CheckBox, MySection } from '../../../components/textinput/AccessComponents';
import { FontAwesomeIcon } from '../../../components/icon/FontAwesome';
import cutStringIntoEqualParts from '../../../components/CreditCard/AccountNumArgo';
import { Dropdown } from 'react-native-element-dropdown';
import { cardLists } from '../../../components/CreditCard/CardLists';
import { styleEditCards } from './styles';
import { cardNameList } from '../../../components/CreditCard/CardBrandList';
import regex from '../../../config/Regex';
import { CardField, CardFieldInput, CardForm, useStripe } from '@stripe/stripe-react-native';
import { STRIPE_SECRET_KEY } from '@env'
import AxiosInstance from '../../../util/AxiosInstance';
import Wrapper from '../../../components/Wrapper';
import Button from '../../../components/Button/Button';
import { AppContext } from '../../../util/AppContext';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { dataUserSelector } from '../../../redux-store';
import { useTranslation } from 'react-i18next';

const EditCard = () => {
    const userData = useSelector(dataUserSelector)
    const [name, setName] = useState("")
const [isName, setIsName] = useState(true)
const [isDefault,setIsDefault] = useState(false)

const {theme} = useContext(AppContext)
    const [IsFirstTime, setIsFirstTime] = useState(true)
    // Dialog
    const navigation = useNavigation()
    const [isClosed, setIsClosed] = useState(false);
    function dialogFunction() {
        setIsClosed(!isClosed)
    }
    //card info var

    // types of card 
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const stripe = useStripe();

    const [cardDetail,setCardDetail] = useState(null)
    // // check card's info 
    // Flip card 
    // variables 
    const fetchCardDetail = (cardDetail) => {
        console.log("Card details:", cardDetail);
        if (cardDetail.complete) {
          setCardDetail(cardDetail);
        } else {
          setCardDetail(null);
        }
      };
    const rotate = useSharedValue(0);
    const handlePaste = () => {
        // Ngăn chặn hành động paste
        return false;
    };
    // check each element by regex


    const handleSubmitCard = async () => {
        try {
            if(!name||!cardDetail?.complete)
            {
                Alert.alert('Error',"Something wrong in your infomation.")
                return
            }
            const { error,token } = await stripe.createToken({...cardDetail,name:name,type:'Card'});

            if (error) {
                console.error('Error creating token:', error);
            } else {
                console.log('Token created:', token);
                // Xử lý token (ví dụ: gửi đến server)
                const response = await AxiosInstance.post(`payment/save-card?userId=${userData._id}&token=${token.id}&isDefault=${isDefault}`)
                if(response.statusCode =200) 
                    ToastAndroid.show("INSERT NEW CARD SUCCESFULLY!!",ToastAndroid.SHORT)
            }   
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };
    // check empty card element
    const checkElementinCards = () => {
        if (name.length > 4 && regex.fullnameWithRegex.test(name)) {
            setIsName(true)
        } else setIsName(false)
       
    }
    const onBack=()=>{
        if(navigation.canGoBack)
            navigation.goBack()
    }
    useEffect(() => {
        if (!IsFirstTime)
            checkElementinCards();
        return () => {

        }
    }, [name, IsFirstTime])

    const {t}=useTranslation()
    return (

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} style={{ flex: 1 }} >
            <Header onBack={onBack}></Header>
            <Wrapper style={{backgroundColor:'white'}}>
            <View style={[commonStyles.container, { paddingBottom: 15,justifyContent:'center',marginTop:20,backgroundColor:'white' }]}>
                <TextInput
                    keyboardType='default'
                    keyboardAppearance='dark'
                    placeholder={t('Account Name')}
                    placeholderTextColor={"#c3c3c3"}
                    onChangeText={(text) => { setName(text) }}

                    style={[
                        commonStyles.normalText,
                        styleEditCards.inputText
                        , { borderColor: !isName ? 'red' : '#cccccc', }
                    ]}

                />
                {!isName && <Text style={[commonStyles.normalText, styleEditCards.alertText]}>Full name mustn't have the numbers or special character and at least 6 character !!!</Text>}

                <View>
                    <Dialog
                        styleTitle={dialogStyle.title}
                        buttonStyle={dialogStyle.button}
                        styleMessage={dialogStyle.message}
                        styleImage={dialogStyle.image}
                        title={'Successful'}

                        message='You have done your task today!'
                        dialogFunction={dialogFunction}
                        buttonName={"Back to the home"}
                        isClosed={isClosed}
                    />
                </View>


       
                <CardField
                    cardStyle={{height:30}}
                    postalCodeEnabled={false}
                    placeholder={{ number: '4242 4242 4242 4242' }}
                    onFocus={(focusedField) => {
                        if (focusedField == "Cvc")
                            rotate.value = 1
                        else
                            rotate.value = 0
                    }}
                    onCardChange={fetchCardDetail}
                    onBlur={()=>rotate.value=0}

                    onChange={fetchCardDetail}
                    style={styles.cardField}
                />
                <View
                    style={{marginTop:-5,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',width:'50%'}}
                >
                    <CheckBox
                        checked={isDefault}
                        onChange={setIsDefault}
                    />
                    <Text style={[commonStyles.normalText,{marginTop:5,fontSize:16,textAlignVertical:'center'}]}>Set default card</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                   
                    <Button
                        title={"Done"}
                        styleButton={{margin:20,backgroundColor:theme.secondary}}
                        styleText={{color:theme.primary}}
                        onPress={()=>handleSubmitCard()}
                    >

                    </Button>
                   
                </View>
            </View>
            </Wrapper>
        </KeyboardAwareScrollView>
    )
}
export const Header = ({ onBack, onCart }) => {
    return (
        <View
        >
            <View style={[styleCoProdScreen.header,]}>

                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { console.log("back"); onBack(); }}>
                    <Icon name="arrow-back-circle" color={"black"} size={50} />

                </TouchableOpacity>
                <Text style={[commonStyles.normalText, { fontSize: 25, fontWeight: 'bold', color: 'black' }]}>Insert your new card</Text>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { console.log("search"); onCart(); }}>
                    <Icon name="cart-outline" color={"black"} size={40} />

                </TouchableOpacity >
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    cardFieldContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    cardField: {
        height: 60,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
export default EditCard