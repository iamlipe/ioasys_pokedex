import React, { useState, useEffect, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Animated, Easing, StyleSheet, TouchableOpacity } from "react-native";

import { Container, ContainerToggle } from "./styles";

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}

const Toggle: React.FC<Props> = ({ containerStyle = {} }) => {
  const refToggle = useRef(null);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (refToggle.current) {
      Animated.timing(animatedValue, {
        toValue: refToggle.current.value ? 1 : 0,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        isInteraction: true,
        useNativeDriver: false,
      }).start();
    }
  });

  const moveToggle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 18],
  });

  return (
    <Container style={containerStyle}>
      <TouchableOpacity
        ref={refToggle}
        testID="toggle-theme-mode"
        onPress={() => {
          refToggle.current.value = !refToggle.current.value;
          setAnimatedValue(
            refToggle.current.value
              ? new Animated.Value(0)
              : new Animated.Value(1)
          );
        }}
      >
        <ContainerToggle>
          <Animated.View
            style={[styles.toggleWheelStyle, { marginLeft: moveToggle }]}
          />
        </ContainerToggle>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  toggleWheelStyle: {
    width: 15,
    height: 15,
    backgroundColor: "#8D8B92",
    borderRadius: 30,
  },
});

export default Toggle;
