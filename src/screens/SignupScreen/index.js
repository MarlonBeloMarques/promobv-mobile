import React, { useState, useRef, useEffect } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { Block, Input, Button, Text } from "../../elements";
import { oauth2, theme } from "../../constants";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

import { CheckBox } from 'react-native-elements'

import { setUser } from "../../services/user";
import AlertMessage from "../../components/Alert";
import { DotIndicator } from 'react-native-indicators'
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

export default function SignupScreen(props) {
  const [userNickname, setUserNickname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [ checked, setChecked ] = useState(false)
  const [loader, setLoader] = useState(false)
  const [errors, setErrors] = useState([]);
  const [exceptionsErrors, setExceptionsErrors] = useState([]);

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

  const messagesError = [
    {
      fieldName: "userNickname",
      message: "Usuário incorreto",
    },
    {
      fieldName: "email",
      message: "E-mail incorreto",
    },
  ];

  const setErrorType = (error1, error2, label) => {
    if (exceptionsErrors.length === 0) {
      return errorStyle(error1)
        ? messagesError.filter((item) => {
            return item.fieldName === error1;
          })[0].message : label;
    } else if (
      email &&
      password &&
      userNickname
    ) {
      if (
        exceptionsErrors.filter((item) => {
          return error2 === item.fieldName;
        })[0] !== undefined
      ) {
        return errorStyle(error2) ? exceptionsErrors.filter((item) => {
              return error2 === item.fieldName;
            })[0].message : label;
      }
    }

    return label;
  };

  const mockData = "Concordo com os TERMOS DE CONDIÇÕES DE USO e POLÍTICA DE PRIVACIDADE."

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (userNickname !== "") checkErrors("userNickname");
    if (userNickname !== "") checkErrors("apelido");
    if (email !== "") checkErrors("email");
    if (password !== "") checkErrors("password");
  }, [userNickname, email, password]);

  async function handleSubmit() {
    
    if (userNickname === "") setErrors((prevErrors) => [...prevErrors, "userNickname"]);
    if (email === "") setErrors((prevErrors) => [...prevErrors, "email"]);
    if (password === "") setErrors((prevErrors) => [...prevErrors, "password"]);

    try {      
      if(userNickname !== '' && email !== '' && password !== '') {
        if(checked) {
          setLoader(true);
          await setUser(userNickname, email, password).then(res => {

            switch (res.status) {
              case 201:
                Keyboard.dismiss();

                AlertMessage({
                  title: "Sucesso",
                  message: "Cadastro realizado com sucesso. Verifique seu e-mail para finalizar o cadastro.",
                });

                props.navigation.navigate("login");
                break;
            
              default:
                break;
            }
          })

          setLoader(false)
        }
        else {
          AlertMessage({
            title: 'Atenção',
            message: 'Concorde com os Termos de Condições de Uso e Política de Privacidade.'
          })
        }
      } else {
        setErrors((prevErrors) => [...prevErrors, "userNickname"]);
        setErrors((prevErrors) => [...prevErrors, "email"]);
        setErrors((prevErrors) => [...prevErrors, "password"]);
      }
      
    } catch ({ response }) {
      const err = [];
      for (const item of response.data.errors) {
        err.push(item.fieldName);
      }

      setErrors([]);
      setExceptionsErrors(response.data.errors);
      setErrors(err);
      setLoader(false)
    }
  }

  useEffect(() => {
    Linking.addEventListener("url", handleOpenUrl);

    return () => {
      Linking.removeEventListener("url", handleOpenUrl);
    }
  })

  async function handleOpenUrl(event) {
    console.log('event =>')
    console.log(event)

    const handledUrl = event.url.split("?").join("");
    
    await Linking.openURL(handledUrl);
  }

  async function signUpWithSocial(link) {
    await WebBrowser.openBrowserAsync(link);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <KeyboardAvoidingView behavior={"padding"}>
        <Block flex={false} padding={[0, theme.sizes.base * 2]}>
          <Block flex={false}>
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

          <Block flex={false} padding={[theme.sizes.base, 0]}>
            <Input
              label={setErrorType("userNickname", "apelido", "Usuário")}
              error={
                exceptionsErrors.length === 0
                  ? errorStyle("userNickname")
                  : errorStyle("apelido")
              }
              defaultValue={userNickname}
              onChangeText={setUserNickname}
              next
              submitEditing={() => emailRef.current.focus()}
            />
            <Input
              label={setErrorType("email", "email", "E-mail")}
              message={"(Encaminharemos um e-mail de confirmação)"}
              error={
                exceptionsErrors.length === 0
                  ? errorStyle("email")
                  : errorStyle("email")
              }
              defaultValue={email}
              onChangeText={setEmail}
              email
              reference={emailRef}
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
            />

            <CheckBox
              title={mockData}
              checked={checked}
              onPress={() => setChecked(!checked)}
              containerStyle={styles.checkbox}
              textStyle={{
                fontSize: 10,
                color: theme.colors.gray,
                fontWeight: "normal",
              }}
            />

            <Block flex={false} padding={[theme.sizes.padding, 0]}>
              <Button onPress={handleSubmit} color={theme.colors.primary}>
                {loader ? (
                  <Block flex={false} center>
                    <DotIndicator color={theme.colors.white} size={5} />
                  </Block>
                ) : (
                  <Text bold white center>
                    Cadastra-se
                  </Text>
                )}
              </Button>
            </Block>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
