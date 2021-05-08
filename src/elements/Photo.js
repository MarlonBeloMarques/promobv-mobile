import React from 'react';
import { StyleSheet, Animated, Image } from "react-native";
import { theme } from "../constants";

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
    width,
    height,
    style,
    avatar
  } = props;

  const blockStyles = [
    width && height && { width, height },
    avatar && styles.avatar,
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

  if (animated) {
    return <Animated.Image style={blockStyles} source={ typeof props.image === 'string' ? { uri: props.image } : props.image}></Animated.Image>;
  }

  return <Image style={blockStyles} source={ typeof props.image === 'string' ? { uri: props.image } : props.image}></Image>
}

export const styles = StyleSheet.create({
  block: {
    flex: 1
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 26
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