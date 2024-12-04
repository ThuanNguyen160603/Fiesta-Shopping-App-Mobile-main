import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MetarialIcon } from '../../../components/icon/Material';
import { FontAwesomeIcon } from '../../../components/icon/FontAwesome';


/* 
    packing,Processing,Shipping,Delivered,Pending
*/
const OrderStatusIndicator = ({ status }) => {
    return (
        <View style={styles.container}>
            {
                 status === 'Processing' || status === 'Shipping' || status === 'Delivered' || status === 'Pending'?
                    <View style={[styles.viewPosition, { width: status === 'Pending' ? 20 : 10, height: status === 'Pending' ? 20 : 10, backgroundColor: 'black' }]}>
                        {
                            status === 'Pending' ? <MetarialIcon name='beenhere' size={13} color='white' /> : <View />
                        }
                    </View> :
                    <View style={styles.viewPosition} />
            }
          
            <View style={[styles.viewLine, status === 'Processing' || status === 'Shipping' || status === 'Delivered' ? { backgroundColor: 'black' } : {}]} />
            {
                status === 'Processing' || status === 'Shipping' || status === 'Delivered' ?
                    <View style={[styles.viewPosition, { width: status === 'Processing' ? 20 : 10, height: status === 'Processing' ? 20 : 10, backgroundColor: 'black' }]}>
                        {
                            status === 'Processing' ? <MetarialIcon name='clean-hands' size={13} color='white' /> : <View />
                        }
                    </View> :
                    <View style={styles.viewPosition} />
            }
            <View style={[styles.viewLine, status === 'Shipping' || status === 'Delivered' ? { backgroundColor: 'black' } : {}]} />
            {
                status === 'Shipping' || status === 'Delivered' ?
                    <View style={[styles.viewPosition, { width: status === 'Shipping' ? 20 : 10, height: status === 'Shipping' ? 20 : 10, backgroundColor: 'black' }]}>
                        {
                            status === 'Shipping' ? <MetarialIcon name='flight' size={13} color='white' /> : <View />
                        }
                    </View> :
                    <View style={styles.viewPosition} />
            }
            <View style={[styles.viewLine, status === 'Delivered' ? { backgroundColor: 'black' } : {}]} />
            {
                status === 'Delivered' ?
                    <View style={[styles.viewPosition, { width: status === 'Delivered' ? 20 : 10, height: status === 'Delivered' ? 20 : 10, backgroundColor: 'black' }]}>
                        {
                            status === 'Delivered' ? <FontAwesomeIcon name='money' size={13} color='white' /> : <View />
                        }
                    </View> :
                    <View style={styles.viewPosition} />
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    viewPosition: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center', alignItems: 'center'
    },
    viewLine: {
        backgroundColor: '#f0f0f0',
        width: '27%',
        height: 3,
        marginLeft: 2, marginRight: 2,
    }
});

export default OrderStatusIndicator