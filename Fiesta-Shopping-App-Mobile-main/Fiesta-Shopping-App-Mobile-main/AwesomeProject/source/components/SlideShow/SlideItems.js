import { TouchableOpacity, Dimensions, StyleSheet, SafeAreaView, StatusBar, ImageBackground, View, Text } from 'react-native';
import React from 'react';
import StyleSlideShow from './Styles';
const { width, height } = Dimensions.get('screen');

const SlideItems = (props) => {
  const { index, onClick, item, widthR, flexH, heightRate, widthRate, styleItem, children } = props;

  return (

    <SafeAreaView 
    key={index}
    
    style={{
      flex: 1,
      height: height * heightRate,
      width: width * widthRate,
    }}>
      <StatusBar translucent backgroundColor='transparent' />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => { onClick(index); console.log("Item clicked",index); }}
        style={{ width: '100%', height: '100%' }} // Đặt kích thước cho TouchableOpacity
      >
        <ImageBackground
          source={{ uri: item.url }}
          style={[styleItem ? styleItem : StyleSlideShow.backgroundImage, { width: widthR, flex: flexH }]}
        >
          {/* Nội dung bên trong ImageBackground */}
          {children}
        </ImageBackground>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SlideItems;
