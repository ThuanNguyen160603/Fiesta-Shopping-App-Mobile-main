import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { StylePublic, commonStyles } from '../../css/styles/public'
import { POPPINS_FONT } from '../../css/theme/Theme'
import { MetarialIcon } from '../icon/Material'
import { FontAwesomeIcon } from '../icon/FontAwesome'

const HistoryItem = () => {
    return (
        <View style={[StylePublic.shadow, {marginVertical:10, elevation:4,borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingRight: 20, justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Image style={{ borderRadius: 15, margin: 10, marginRight: 15, width: 80, height: 80, backgroundColor: 'black' }} source={require('../../assets/images/successful.gif')} />

                <View>
                    <Text
                        style={[commonStyles.normalText, { fontWeight: 'bold', color: 'black', fontSize: 18 }]}
                    >Name</Text>
                    <Text
                        style={[commonStyles.normalText, { fontSize: 14 }]}
                    >Brand</Text>
                    <View style={{flexDirection:'row' ,alignItems:'center' ,padding:4,borderRadius:8,backgroundColor:'#e2e2e2'}}>
                    <FontAwesomeIcon name={"check-circle"} size={11} color={'black'}  />
                    <Text
                        style={[POPPINS_FONT.black, { fontSize: 11,marginLeft:5, fontWeight: 'bold', color: 'black' }]}
                    >Price</Text>
                    </View>
                </View>
            </View>
            <Text
                style={[POPPINS_FONT.extra_bold, { fontSize: 20, fontWeight: 'bold', color: 'black' }]}

            >
                $250.00
            </Text>
        </View>
    )
}

export default HistoryItem

const styles = StyleSheet.create({})