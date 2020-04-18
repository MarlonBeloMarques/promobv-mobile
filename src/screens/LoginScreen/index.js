import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Image, Alert } from "react-native";
import { Block, Input, Button, Text} from '../../elements'
import { theme } from "../../constants";

import styles from './styles'
import logo from '../../../assets/images/promobv.png'

import { signIn, successfulLogin } from '../../services/auth'
import { StatusBar } from "react-native";

export default function LoginScreen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(email + " " + password);

  async function handleSubmit() {
    try {
      const { headers : { authorization }, status } = await signIn(email, password)

      switch (status) {
        case 200:
          Alert.alert(
            'Sucesso'
          )

          successfulLogin(authorization)

          props.navigation.navigate('Promoções')
        
          break
      }

    } catch ({ response }) {
      
  }
}

  function onSignupClicked() {
    props.navigation.navigate('signup')
  }

  function onPasswordClicked() {
    props.navigation.navigate("password");
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Block
        padding={[
          theme.sizes.base,
          theme.sizes.base * 2,
          0,
          theme.sizes.base * 2,
        ]}
      >
        <Block flex={0.3} middle center>
          <Image resizeMode="contain" source={logo} style={styles.logo} />
        </Block>
        <Block>
          <Input label="E-mail" defaultValue={email} onChangeText={setEmail} />
          <Input
            secure
            label="Senha"
            defaultValue={password}
            onChangeText={setPassword}
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

          <Button onPress={handleSubmit} color={theme.colors.primary}>
            <Text bold white center>
              Entrar
            </Text>
          </Button>
          <Block padding={[theme.sizes.base, 0]}>
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
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}
