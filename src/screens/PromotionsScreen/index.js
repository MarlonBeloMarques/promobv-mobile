import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Block, Text } from "../../elements";
import { theme } from "../../constants";

import styles from "./styles";
import Header from '../../elements/Header'
import { DrawerActions } from "react-navigation-drawer";

export default function PasswordScreen(props) {
  
  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header onPress={onClickMenu}>Promoções</Header>
      <Block center middle padding={[0, theme.sizes.base * 2]}>
        <Text>Promocao screen</Text>
      </Block>
    </KeyboardAvoidingView>
  );
}
