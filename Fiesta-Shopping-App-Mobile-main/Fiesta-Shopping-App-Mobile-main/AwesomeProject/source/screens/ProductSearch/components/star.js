import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export const Star = ({ count,size }) => {
    const star = Array.from({ length: count }, (_, index) => index);
    return (
        <View style={{ flexDirection: 'row' }}>
            {star.map((star, index) => (
                <Image key={index} style={[style.star,{width:size?size:14,height:size?size:14}]} source={require('../../../assets/images/goldstar.png')} />
            ))}
        </View>
    )
}
const style = StyleSheet.create({
    star: {
        width: 14,
        height: 14,
        marginHorizontal:4
    }
})
