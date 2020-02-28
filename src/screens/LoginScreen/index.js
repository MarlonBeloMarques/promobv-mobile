import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Block, Input, Button, Text} from '../../elements'
import { theme } from "../../constants";

export default function LoginScreen(props) {
  const [email, setEmail] = useState('promobv@react.com')
  const [password, setPassword] = useState('promobv')

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Block padding={[0, theme.sizes.base * 2]}>
        <Block>
          <Input 
            label="E-mail" 
            style={[styles.input]} 
            defaultValue={email} />
          <Input 
            secure 
            label="Senha" 
            style={[styles.input]} 
            defaultValue={password} />
            <Button color={theme.colors.primary}>
              <Text bold white center >Entrar</Text>
            </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },

  input: {
    borderColor: "transparent",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray
  },

  inputError: {
    borderBottomColor: theme.colors.accent
  }
});
