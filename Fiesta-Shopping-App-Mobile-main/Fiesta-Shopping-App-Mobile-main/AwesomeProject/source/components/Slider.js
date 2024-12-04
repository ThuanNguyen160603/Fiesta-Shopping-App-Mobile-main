import React, { useState } from "react";

import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const CustomMultiSlider =({multiSliderValue,onChangeMultiSliderValue}) =>{
  const {width} = Dimensions.get('screen')

  return (
    <View style={styles.container}>

      {/* <View style={styles.sliderOne}>
        <Text style={styles.text}>
          Two Markers with minimum overlap distance:
        </Text>
      </View> */}
      <MultiSlider
        values={[multiSliderValue[0], multiSliderValue[1]]}
        sliderLength={width-60}
        onValuesChange={onChangeMultiSliderValue}
        min={0}
        max={100000}
        step={1000}
        allowOverlap={false}
        snapped
        
        minMarkerOverlapDistance={10}
        customMarkerLeft={(e) => {
          return <CustomMarker currentValue={e.currentValue} />;
        }}
        customMarkerRight={(e) => {
          return <CustomMarker currentValue={e.currentValue} />;
        }}
        isMarkersSeparated={true}
      />
    </View>
  );
}
export default CustomMultiSlider
const CustomMarker = ({ currentValue }) => {
  return (

      <View
        style={{
        
          width: 15,
          height: 15,
          borderRadius: 10,
          backgroundColor: "black",
        }}
      >

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sliders: {
    margin: 20,
    width: 280,
  },
  text: {
    alignSelf: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 50,
  },
  image: {
    height: 40,
    width: 40,
  },
});