import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, FlatList, StyleSheet } from "react-native";
import { Block, Input, Button, Text, Photo } from "../../elements";
import { Header } from '../../components'
import { theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";

export default function MyAccountScreen(props) {

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  function onClickProfile() {
    props.navigation.navigate('Perfil')
  }

  function onClickMyPromotions() {
    props.navigation.navigate("MinhasPromocoes");
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header barStyle='dark-content' onPress={onClickMenu} color={theme.colors.white}>
        <Text h3 bold gray>Minha Conta</Text>
      </Header>
      <Block>
        <Block
          button
          flex={false}
          padding={[theme.sizes.padding, 0, 0, theme.sizes.padding]}
          onPress={onClickMyPromotions}
        >
          <Text h3 gray>Minhas Promoções</Text>
        </Block>
        <Block
          button
          flex={false}
          padding={[theme.sizes.padding, 0, 0, theme.sizes.padding]}
          onPress={onClickProfile}
        >
          <Text h3 gray>Editar Perfil</Text>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.white
  }
});
