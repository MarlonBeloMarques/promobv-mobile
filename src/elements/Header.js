import React from 'react';
import { View, TouchableOpacity, StatusBar } from "react-native";
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { theme } from '../constants';
import { Text, Block } from './index'

export default function Header(props) {

  return (
    <Block 
      color={theme.colors.primary} 
      flex={false} 
      padding={[50, 0, 0]}
      row
      center
      >
      <StatusBar barStyle="light-content"></StatusBar>
      <TouchableOpacity style={styles.trigger} {...props}>
        <Ionicons name={"ios-menu"} size={30} color={theme.colors.white} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.children}</Text>
    </Block>
  );
}

const styles = StyleSheet.create({
  trigger: {
    marginLeft: 27.5,
    width: 40,
    height: 40
  },

  title: {
    color: theme.colors.white,
    fontWeight: 'bold',
    paddingBottom: theme.sizes.base - 5,
    marginLeft: theme.sizes.base
  }
});

