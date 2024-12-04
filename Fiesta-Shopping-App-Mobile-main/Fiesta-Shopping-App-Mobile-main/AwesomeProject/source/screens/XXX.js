import React from "react";

import { StyleSheet, View, Text, Image } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

export default function Multi() {
  const [multiSliderValue, setMultiSliderValue] = React.useState([0, 100]);

  nonCollidingMultiSliderValuesChange = (values) => setMultiSliderValue(values);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sliders</Text>

      <View style={styles.sliderOne}>
        <Text style={styles.text}>
          Two Markers with minimum overlap distance:
        </Text>
      </View>
      <MultiSlider
        values={[multiSliderValue[0], multiSliderValue[1]]}
        sliderLength={280}
        onValuesChange={nonCollidingMultiSliderValuesChange}
        min={0}
        max={100}
        step={1}
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