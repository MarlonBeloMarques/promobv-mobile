import React, { useState, useRef } from "react";
import { KeyboardAvoidingView, Image, Keyboard } from "react-native";
import { Block, Input, Button, Text} from '../../elements'
import { theme } from "../../constants";

import styles from './styles'
import logo from '../../../assets/images/promobv.png'

import { signIn, successfulLogin } from '../../services/auth'
import { StatusBar } from "react-native";

import { useDispatch } from "react-redux";
import { signInSuccess, signOutRequest } from "../../store/modules/auth/actions";
import { getUser } from "../../services/user";

import { DotsLoader } from 'react-native-indicator';
import AlertMessage from "../../components/Alert";

export default function LoginScreen(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loader, setLoader] = useState(false)

  const dispatch = useDispatch()

  const passwordRef = useRef();

  useEffect(() => {
    dispatch(signOutRequest())
  }, [])

  async function handleSubmit() {
    try {
      setLoader(true)

      const { headers : { authorization }, status } = await signIn(email, password)

      switch (status) {
        case 200:
          await successfulLogin(authorization)

          await getUser(email).then(res => {
            let response = res.data
            dispatch(signInSuccess(authorization, JSON.parse(response.id)))
          })

          Keyboard.dismiss()

          setLoader(false);

          props.navigation.navigate('Promoções')
        
          break
      }


    } catch ({ response }) {
      setLoader(false)
      if(response.status === 403) {
        AlertMessage({
          title: "Atenção",
          message: "Verifique no seu e-mail a confirmação de usuário.",
        });

        setEmail('')
        setPassword('')
      }
  }
}

  function onSignupClicked() {
    props.navigation.navigate('signup')
  }

  function onPasswordClicked() {
    props.navigation.navigate("password");
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
      <StatusBar barStyle="dark-content" />
      <Block
        padding={[
          theme.sizes.base,
          theme.sizes.base * 2,
          0,
          theme.sizes.base * 2,
        ]}
      >
        <Block flex={0.4} middle center>
          <Image resizeMode="contain" source={logo} style={styles.logo} />
        </Block>
        <Block padding={[theme.sizes.base, 0]}>
          <Block flex={false}>
            <Input
              label="E-mail"
              defaultValue={email}
              onChangeText={setEmail}
              next
              submitEditing={() => passwordRef.current.focus()}
            />
            <Input
              secure
              label="Senha"
              defaultValue={password}
              onChangeText={setPassword}
              reference={passwordRef}
              done
              submitEditing={handleSubmit}
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
              {loader && (
                <Block flex={false} center>
                  <DotsLoader color={theme.colors.white} size={10} />
                </Block>
              )}
              {!loader && (
                <Text bold white center>
                  Entrar
                </Text>
              )}
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
          {/* <Block padding={[theme.sizes.base * 2, 0, theme.sizes.base, 0]}>
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
            
          </Block> */}
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}
