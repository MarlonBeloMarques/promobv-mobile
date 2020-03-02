import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Image } from "react-native";
import { Block, Input, Button, Text} from '../../elements'
import { theme } from "../../constants";

import styles from './styles'
import logo from '../../../assets/images/promobv.png'

export default function LoginScreen(props) {
  const [email, setEmail] = useState('promobv@react.com')
  const [password, setPassword] = useState('promobv')

  function onSignupClicked() {
    props.navigation.navigate('signup')
  }

  function onLoginClicked() {
    props.navigation.navigate("promoções");
  }

  function onPasswordClicked() {
    props.navigation.navigate("password");
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Block middle padding={[0, theme.sizes.base * 2]} margin={[theme.sizes.base * 8 ,0]}>
        <Block center middle>
            <Image source={logo} style={styles.logo}/>
        </Block>  
        <Input 
          label="E-mail" 
          style={[styles.input]} 
          defaultValue={email} />
        <Input 
          secure 
          label="Senha" 
          style={[styles.input]} 
          defaultValue={password} />
          <Button onPress={onPasswordClicked} style={styles.forgotPassword}>
            <Text 
              caption
              primary
              right
              style={{ textDecorationLine : 'underline' }}>
                Recuperar senha?
            </Text>
          </Button>
          <Button onPress={onLoginClicked} color={theme.colors.primary}>
            <Text bold white center >Entrar</Text>
          </Button>
            
      </Block>

      <Block padding={[0, theme.sizes.base * 2]} style={styles.end}>
        <Button color={theme.colors.google}>
          <Text bold white center >Entrar com o Google</Text>
        </Button>
        <Button color={theme.colors.facebook}>
          <Text bold white center >Entrar com o Facebook</Text>
        </Button>
        <Button onPress={onSignupClicked} style={styles.signup}>
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
