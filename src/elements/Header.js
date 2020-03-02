import React from 'react';
import { View, TouchableOpacity, StatusBar } from "react-native";
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { theme } from '../constants';
import Text from './Text'

export default function Header(props) {

  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content"></StatusBar>
      <TouchableOpacity style={styles.trigger} {...props}>
        <Ionicons name={"ios-menu"} size={30} color={theme.colors.white} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center'
  },

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

