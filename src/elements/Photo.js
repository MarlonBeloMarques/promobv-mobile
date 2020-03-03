import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { theme } from "../constants";

import styled from "styled-components/native";

export default function Photo(props) {

  const {
    flex,
    row,
    column,
    center,
    middle,
    left,
    right,
    top,
    bottom,
    card,
    space,
    animated,
    wrap,
    size,
    style
  } = props;

  const blockStyles = [
    size,
    flex && { flex },
    flex === false && { flex: 0 }, // redefinir / desativar flex
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    card && styles.card,
    space && { justifyContent: `space-${space}` },
    wrap && { flexWrap: "wrap" },
    style // reescrever estilos predefinidos
  ];

  const Image = styled.Image`
    width: ${size}%;
  `;

  if (animated) {
    return <Animated.Image style={blockStyles} source={{ uri: props.image }}></Animated.Image>;
  }

  return <Image style={blockStyles} source={{ uri: props.image }}></Image>
}

export const styles = StyleSheet.create({
  block: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  card: {
    borderRadius: theme.sizes.radius
  },
  center: {
    alignItems: "center"
  },
  middle: {
    justifyContent: "center"
  },
  left: {
    justifyContent: "flex-start"
  },
  right: {
    justifyContent: "flex-end"
  },
  top: {
    justifyContent: "flex-start"
  },
  bottom: {
    justifyContent: "flex-end"
  }
});

Photo.propTypes = {
  image: ''
};
