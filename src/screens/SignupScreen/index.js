import React, { useState } from "react";
import { KeyboardAvoidingView, Dimensions } from "react-native";
import { Block, Input, Button, Text } from "../../elements";
import { theme } from "../../constants";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

import { CheckBox } from 'react-native-elements'

const { width } = Dimensions.get('window')

export default function SignupScreen(props) {
  const [email, setEmail] = useState("promobv@react.com");
  const [password, setPassword] = useState("promobv");

  const [ checked, setChecked ] = useState(false)

  const mockData = "Concordo com os TERMOS DE CONDIÇÕES DE USO e POLÍTICA DE PRIVACIDADE."

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block flex={0.3}>
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
          </Block>

          <Block flex={0.7} padding={[theme.sizes.base, 0]}>
            <Input label="Usuário" style={[styles.input]} />
            <Input
              label={
                <Text style={{ color: theme.colors.gray }}>
                  E-mail {""}
                  <Text style={[styles.message, { color: theme.colors.gray }]}>
                    (Encaminharemos um e-mail de confirmação)
                  </Text>
                </Text>
              }
              style={[styles.input]}
              defaultValue={email}
            />
            <Input
              secure
              label="Senha"
              style={[styles.input]}
              defaultValue={password}
            />

            <CheckBox
              title={mockData}
              checked={checked}
              onPress={() => setChecked(!checked)}
              containerStyle={styles.checkbox}
              textStyle={{
                fontSize: 10,
                color: theme.colors.gray,
                fontWeight: "normal"
              }}
            />

            <Button color={theme.colors.primary}>
              <Text bold white center>
                Cadastra-se
              </Text>
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
