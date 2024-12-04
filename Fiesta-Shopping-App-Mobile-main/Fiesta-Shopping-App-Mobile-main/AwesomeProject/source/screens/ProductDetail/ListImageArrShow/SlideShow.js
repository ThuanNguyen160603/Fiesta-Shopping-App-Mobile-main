import { Animated,View, Text,SafeAreaView,StatusBar,ImageBackground } from 'react-native'
import React,{useEffect,useRef,useState} from 'react'
import StyleSlideShow from './Styles'
const SlideShow = () => {
    const slideAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 1000, // Thời gian của animation (milliseconds)
          useNativeDriver: false, // Phải sử dụng trình quản lý Native để hoạt động với ImageBackground
        }).start();
      }, [slideAnimation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar translucent backgroundColor='transparent' />
   
    <ImageBackground
        
        source={{uri:'https://w0.peakpx.com/wallpaper/975/501/HD-wallpaper-galaxy-pink-purple-thumbnail.jpg'}}
        style={StyleSlideShow.backgroundImage}
      >
         <View
        style={{backgroundColor:'red', width:30,height:30}}
        ></View>
        {/* Nội dung bên trong ImageBackground */}
    </ImageBackground>

    </SafeAreaView>
   
  )
}

export default SlideShow