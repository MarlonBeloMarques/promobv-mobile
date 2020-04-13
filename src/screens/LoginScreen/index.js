import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Image } from "react-native";
import { Block, Input, Button, Text} from '../../elements'
import { theme } from "../../constants";

import styles from './styles'
import logo from '../../../assets/images/promobv.png'

import { signIn } from '../../services/auth'

export default function LoginScreen(props) {
  const [email, setEmail] = useState('marlonmarqsbr@gmail.com')
  const [password, setPassword] = useState('123')

  function onSignupClicked() {
    props.navigation.navigate('signup')
  }

  function onLoginClicked() {
     signIn(email, password).
       then(res => {
         console.log(res.headers.authorization)
       },
       error => {})
  }

  function onPasswordClicked() {
    props.navigation.navigate("password");
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
        <Block padding={[theme.sizes.base, theme.sizes.base * 2, 0, theme.sizes.base * 2]}>
          
          <Block middle flex={0.3} center>
            <Image resizeMode='contain' source={logo} style={styles.logo} />
          </Block>
          
          <Block middle flex={0.7}>
            <Input 
              value={email}
              label="E-mail"  
              style={[styles.input]} 
              defaultValue={email} />
            <Input
              value={password}
              secure
              label="Senha"
              style={[styles.input]}
              defaultValue={password}
            />
            <Button onPress={onPasswordClicked} style={styles.forgotPassword}>
              <Text
                caption
                primary
                right
                style={{ textDecorationLine: "underline" }}
              >
                Recuperar senha?
              </Text>
            </Button>

            <Button onPress={onLoginClicked} color={theme.colors.primary}>
              <Text bold white center>
                Entrar
              </Text>
            </Button>
          </Block>
        </Block>

        <Block
          padding={[theme.sizes.base, theme.sizes.base * 2]}
          style={styles.end}
        >
          <Button color={theme.colors.google}>
            <Text bold white center>
              Entrar com o Google
            </Text>
          </Button>
          <Button color={theme.colors.facebook}>
            <Text bold white center>
              Entrar com o Facebook
            </Text>
          </Button>
          <Button onPress={onSignupClicked} style={styles.signup}>
            <Text
              caption
              primary
              center
              style={{ textDecorationLine: "underline" }}
            >
              Crie uma conta
            </Text>
          </Button>
        </Block>
    </KeyboardAvoidingView>
  );
}
