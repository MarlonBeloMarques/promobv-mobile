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
        <Block middle>
          <Input 
            label="E-mail" 
            style={[styles.input]} 
            defaultValue={email} />
          <Input 
            secure 
            label="Senha" 
            style={[styles.input]} 
            defaultValue={password} />
            <Button style={styles.forgotPassword}>
              <Text 
                caption
                primary
                right
                style={{ textDecorationLine : 'underline' }}>
                  Recuperar senha?
              </Text>
            </Button>

            <Button color={theme.colors.primary}>
              <Text bold white center >Entrar</Text>
            </Button>
            
        </Block>
      </Block>

      <Block padding={[0, theme.sizes.base * 2]} style={styles.end}>
        <Button color={theme.colors.google}>
          <Text bold white center >Entrar com o Google</Text>
        </Button>
        <Button color={theme.colors.facebook}>
          <Text bold white center >Entrar com o Facebook</Text>
        </Button>
        <Button style={styles.signup}>
          <Text 
            caption
            primary
            center
            style={{ textDecorationLine : 'underline' }}>
            Crie uma conta              
          </Text>
        </Button>
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
    borderWidth: 1,
    borderColor: theme.colors.gray3
  },

  inputError: {
    borderBottomColor: theme.colors.accent
  },

  forgotPassword: {
    marginTop: 1
  }, 

  signup: {
    marginTop: theme.sizes.base 
  }, 

  end: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: theme.sizes.padding * 2
  }
})
