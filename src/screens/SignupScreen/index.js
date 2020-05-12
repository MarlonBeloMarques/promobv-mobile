import React, { useState, useRef } from "react";
import { Keyboard } from "react-native";
import { Block, Input, Button, Text } from "../../elements";
import { theme } from "../../constants";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

import { CheckBox } from 'react-native-elements'

import { setUser } from "../../services/user";
import AlertMessage from "../../components/Alert";
import { DotsLoader } from 'react-native-indicator'

export default function SignupScreen(props) {
  const [userNickname, setUserNickname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [ checked, setChecked ] = useState(false)
  const [loader, setLoader] = useState(false)

  const mockData = "Concordo com os TERMOS DE CONDIÇÕES DE USO e POLÍTICA DE PRIVACIDADE."

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit() {
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
        AlertMessage({
          title: "Atenção",
          message: "O Cadastro possui campos não preenchidos.",
        });
      }
      
    } catch ({ response }) {
      setLoader(false)
    }
  }

  return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={[0, theme.sizes.base * 2]}>
          {/* <Block flex={0.3}>
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

          <Block flex={false} padding={[theme.sizes.base, 0]}>
            <Input
              label="Usuário"
              defaultValue={userNickname}
              onChangeText={setUserNickname}
              next
              submitEditing={() => emailRef.current.focus()}
            />
            <Input
              label={
                <Text style={{ color: theme.colors.gray }}>
                  E-mail
                  <Text style={[styles.message, { color: theme.colors.gray }]}>
                    (Encaminharemos um e-mail de confirmação)
                  </Text>
                </Text>
              }
              defaultValue={email}
              onChangeText={setEmail}
              reference={emailRef}
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
                {loader && (
                  <Block flex={false} center>
                    <DotsLoader color={theme.colors.white} size={10} />
                  </Block>
                )}
                {!loader && (
                  <Text bold white center>
                    Cadastra-se
                  </Text>
                )}
              </Button>
            </Block>
          </Block>
        </Block>
      </ScrollView>
  );
}
