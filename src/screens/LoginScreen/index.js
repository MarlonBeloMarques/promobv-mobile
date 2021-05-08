import React, { useState, useRef, useEffect } from "react";
import { KeyboardAvoidingView, Image, Keyboard, ScrollView, Platform } from "react-native";
import { Block, Input, Button, Text} from '../../elements'
import { oauth2, theme } from "../../constants";

import styles from './styles'
import logo from '../../../assets/images/promobv.png'

import { signIn, successfulLogin } from '../../services/auth'
import { StatusBar } from "react-native";

import { useDispatch } from "react-redux";
import { signInSuccess, signOutRequest } from "../../store/modules/auth/actions";
import { getUser } from "../../services/user";

import { DotIndicator } from 'react-native-indicators';
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import AlertMessage from "../../components/Alert";

export default function LoginScreen(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loader, setLoader] = useState(false)
  const [errors, setErrors] = useState([]);

  const errorStyle = (key) => {
    return errors.includes(key) ? true : false;
  };

  const checkErrors = (value) => {
    errors.forEach((error, index) => {
      if (error === value) {
        errors.splice(index, 1);
      }
    });
  };

  const dispatch = useDispatch()

  const passwordRef = useRef();

  useEffect(() => {
    if (email !== '') checkErrors("email");
    if (password !== '') checkErrors("password");
  }, [email, password]);

  useEffect(() => {
    dispatch(signOutRequest())
  }, [])

  async function handleSubmit() {
    try {
      setLoader(true)

      const { headers : { authorization }, status } = await signIn(email, password)

      if(email !== '' && password !== '') {
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

          case 202:
            setLoader(false);
            AlertMessage({
              title: "Atenção",
              message: "Seu email não está ativado.",
            });
        }
      }
    } catch ({ response }) {
      setLoader(false)
      setErrors((prevErrors) => [...prevErrors, "email"]);
      setErrors((prevErrors) => [...prevErrors, "password"]);
  }
}

  function onSignupClicked() {
    props.navigation.navigate('signup')
  }

  function onPasswordClicked() {
    props.navigation.navigate("password");
  }

  useEffect(() => {
    Linking.addEventListener("url", handleOpenUrl);

    return () => {
      Linking.removeEventListener("url", handleOpenUrl);
    };
  });

  async function handleOpenUrl(event) {
    console.log("event =>");
    console.log(event);

    const handledUrl = event.url.split("?").join("");
    if (Platform.OS === "ios") 
      await WebBrowser.dismissBrowser();
    await Linking.openURL(handledUrl);
  }

  async function signUpWithSocial(link) {
    await WebBrowser.openBrowserAsync(link);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior={"padding"}>
        <StatusBar barStyle="dark-content" />
        <Block
          padding={[
            theme.sizes.base,
            theme.sizes.base * 2,
            0,
            theme.sizes.base * 2,
          ]}
        >
          <Block flex={false} middle center>
            <Image resizeMode="contain" source={logo} style={styles.logo} />
          </Block>
          <Block flex={false} padding={[theme.sizes.base, 0]}>
            <Block flex={false}>
              <Input
                label={errorStyle("email") ? "E-mail incorreto" : "E-mail"}
                error={errorStyle("email")}
                defaultValue={email}
                email
                onChangeText={setEmail}
                next
                submitEditing={() => passwordRef.current.focus()}
              />
              <Input
                secure
                label={errorStyle("password") ? "Senha incorreta" : "Senha"}
                error={errorStyle("password")}
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
                {loader ? (
                  <Block flex={false} center>
                    <DotIndicator color={theme.colors.white} size={5} />
                  </Block>
                ) : (
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
            <Block
              flex={false}
              padding={[theme.sizes.base * 2, 0, theme.sizes.base, 0]}
            >
              <Button
                color={theme.colors.google}
                onPress={() => signUpWithSocial(oauth2.GOOGLE_AUTH_URL)}
              >
                <Text bold white center>
                  Entrar com o Google
                </Text>
              </Button>
              <Button
                color={theme.colors.facebook}
                onPress={() => signUpWithSocial(oauth2.FACEBOOK_AUTH_URL)}
              >
                <Text bold white center>
                  Entrar com o Facebook
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
