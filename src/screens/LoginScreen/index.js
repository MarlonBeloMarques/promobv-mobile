import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Block } from '../../elements'

export default function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <Block>
        <Text>Ola</Text>
      </Block>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
