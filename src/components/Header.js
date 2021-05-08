import React from 'react';
import { StatusBar, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons'

import { theme } from '../constants';
import { Text, Block, Button } from '../elements'

export default function Header(props) {

  return (
    <Block 
      color={props.color} 
      flex={false} 
      padding={[ Platform.OS === 'ios' ? 50 : 25, 0, 0, theme.sizes.base]}
      size={ Platform.OS === 'ios' ? theme.sizes.base * 6 :  theme.sizes.base * 5}
      row
      center
      >
      <StatusBar tra {...props}></StatusBar>
      <Button style {...props}>
        <Ionicons name={"ios-menu"} size={30} color={props.colorIcon} />
      </Button>
      <Block padding={[0,0,0,theme.sizes.base * 2.2]}>
        <Text h3 white bold>{props.children}</Text>
      </Block>
    </Block>
  );
}

