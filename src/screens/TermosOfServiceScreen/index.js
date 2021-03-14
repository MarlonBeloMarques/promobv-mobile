import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, FlatList, StyleSheet, View, AsyncStorage } from "react-native";
import { Block, Text, Button, Photo, Input } from "../../elements";
import { Insert, Header } from "../../components";
import { theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

import styles from './styles'

import { ScrollView } from "react-native-gesture-handler";

import { DrawerActions } from "react-navigation-drawer";

export default function TermsOfServiceScreen(props) {

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header barStyle='dark-content' onPress={onClickMenu} color={theme.colors.white}>
        <Text h3 bold gray>Termos de Uso</Text>
      </Header>
      <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
        <Block
          padding={[0, theme.sizes.padding]}
          space="between"
          color={theme.colors.white}
        >
          <Block margin={[theme.sizes.padding]}>
            <Text gray3>
              Voluptate sit est veniam dolore pariatur mollit ut ex est dolor
              anim consectetur. Irure Lorem esse amet laboris in esse minim. Est
              laborum duis fugiat consequat consectetur adipisicing et eu. In
              aute aliqua ullamco nisi proident qui velit dolor consequat
              adipisicing aute. Voluptate sit est veniam dolore pariatur mollit
              ut ex est dolor anim consectetur. Irure Lorem esse amet laboris in
              esse minim. Est laborum duis fugiat consequat consectetur
              adipisicing et eu. In aute aliqua ullamco nisi proident qui velit
              dolor consequat adipisicing aute. Voluptate sit est veniam dolore
              pariatur mollit ut ex est dolor anim consectetur. Irure Lorem esse
              amet laboris in esse minim. Est laborum duis fugiat consequat
              consectetur adipisicing et eu. In aute aliqua ullamco nisi
              proident qui velit dolor consequat adipisicing aute. Voluptate sit
              est veniam dolore pariatur mollit ut ex est dolor anim
              consectetur. Irure Lorem esse amet laboris in esse minim. Est
              laborum duis fugiat consequat consectetur adipisicing et eu. In
              aute aliqua ullamco nisi proident qui velit dolor consequat
              adipisicing aute.
            </Text>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
  
 