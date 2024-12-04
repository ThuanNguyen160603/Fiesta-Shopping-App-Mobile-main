import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'

// Importing card components
import VisaCard from './VisaCard/VisaCard';
import MasterCard from './MasterCard/MasterCard';
// Import other libraries
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '../icon/FontAwesome';

// Card branding suggestion 
/**
* Component gợi ý props.
* @param {{
*    front:true|false,
*    name:string,
*    accountNum:string,
*    expiredDate:string,
*    cardName: "BIDV" | "TechniBank" | "VietTanBank"| "NBBank" | "GodiBank" | "TPBank" | "VietzBank";
* }} props - Props của component.
*/
// 




const CreditCard = ({ name, accountNum, expiredDate, cardName, styleCreditCard, onSwipeable, onLongPress, front, CVV, onRightButton }) => {
    // Variable in component
    const swipeableRef = useRef(null);


    // Method in cards
    const onCardHandle = () => {
        if (typeof onLongPress === 'function') {
            console.log('onLongPress is defined');
            onLongPress()
        } else {
            console.log('onLongPress is not defined');
        }
    }
    const onDeleteCard = () => {
        if (typeof onRightButton === 'function') {
            console.log('onRightButton is defined');
            onRightButton()
        } else {
            console.log('onRightButton is not defined');
        }

    }

    const onSwipeableClose = () => {
        swipeableRef.current.close();
    }
    // Action Delete
    const renderRightActions = () => (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => { onDeleteCard(); onSwipeableClose(); }}
            style={{
                marginLeft: -20,
                backgroundColor: 'black',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 200,
                borderTopRightRadius: 20
                , borderBottomRightRadius: 20
                , marginRight: 20
            }}>
            {/* <Text>Delete</Text> */}

            <FontAwesomeIcon name={"trash"} size={60} color={'white'} />
        </TouchableOpacity>
    );
    // Check info from cards
    const [checkInfoa, setcheckInfo] = useState(false);
    useEffect(() => {

        const checkInfo = () => {
            if (name && accountNum && expiredDate && cardName) {
                setcheckInfo(true)
            }
        }
        checkInfo();

    }, [name, accountNum, expiredDate, cardName])

    return (

        // (checkInfoa == true) ?
        (
            <GestureHandlerRootView
            >

                <Swipeable
                    ref={swipeableRef}
                    renderRightActions={onSwipeable?renderRightActions:null}
                    rightThreshold={onSwipeable?0:1000000}
                    leftThreshold={onSwipeable?0:1000000}

                    overshootLeft={false}
                    overshootRight={false}
                    overshootFriction={8}
                    friction={1}

                >
                    <TouchableOpacity

                        activeOpacity={1}
                        onLongPress={() => onCardHandle()}
                    >
                        {cardName == "Visa" ?
                            <VisaCard name={name} accountNum={accountNum} expiredDate={expiredDate} style={styleCreditCard} front={front} CVV={CVV} />
                            :
                            <MasterCard name={name} accountNum={accountNum} expiredDate={expiredDate} style={styleCreditCard} front={front} CVV={CVV} />
                        }
                    </TouchableOpacity>
                </Swipeable>
            </GestureHandlerRootView>
        )
        // : <View style={{height:200}}>

        // </View>

    )
}

export default CreditCard;


export const Number = {
    MAX_VALUE_FOR_SWIPEABLE_OFFSET: 2000000,
    MIN_VALUE_FOR_SWIPEABLE_OFFSET: 0
}
