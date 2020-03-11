import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, FlatList, StyleSheet } from "react-native";
import { Block, Input, Button, Text, Photo, Header } from "../../elements";
import { theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

export default function MyAccountScreen(props) {

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header color={theme.colors.white}>
        <Text gray>Minha Conta</Text>
      </Header>
      <Block>
        <Block
          button
          flex={false}
          padding={[theme.sizes.padding, 0, 0, theme.sizes.padding]}
        >
          <Text gray>Minhas Promoções</Text>
        </Block>
        <Block
          button
          flex={false}
          padding={[theme.sizes.padding, 0, 0, theme.sizes.padding]}
        >
          <Text gray>Editar Perfil</Text>
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
