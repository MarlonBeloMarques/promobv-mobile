import React from 'react';
import { StatusBar } from "react-native";
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { theme } from '../constants';
import { Text, Block, Button } from './index'

export default function Header(props) {

  return (
    <Block 
      color={theme.colors.primary} 
      flex={false} 
      padding={[50, 0, 0, theme.sizes.base]}
      size={theme.sizes.base * 6}
      row
      center
      >
      <StatusBar barStyle="light-content"></StatusBar>
      <Button style {...props}>
        <Ionicons name={"ios-menu"} size={30} color={theme.colors.white} />
      </Button>
      <Block padding={[0,0,0,theme.sizes.base * 2.2]}>
        <Text white bold>{props.children}</Text>
      </Block>
    </Block>
  );
}

