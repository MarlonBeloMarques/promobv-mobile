import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Block, Input, Button, Text } from "../../elements";
import CheckboxFormX from "react-native-checkbox-form";
import { theme } from "../../constants";

import styles from "./styles";

export default function SignupScreen(props) {
  const [email, setEmail] = useState("promobv@react.com");
  const [password, setPassword] = useState("promobv");

  const mockData = [
    {
      label:
        "Concordo com os TERMOS DE CONDIÇÕES DE USO e POLÍTICA DE PRIVACIDADE.",
      value: "one"
    }
  ];

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Block padding={[0, theme.sizes.base * 2]}>
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

        <Block flex={false} style={styles.block}>
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

          <CheckboxFormX
            style={{ width: 350 - 30 }}
            dataSource={mockData}
            itemShowKey="label"
            itemCheckedKey="RNchecked"
            iconSize={16}
            formHorizontal={false}
            labelHorizontal={true}
            textStyle={styles.checkbox}
          />

        <Button color={theme.colors.primary}>
          <Text bold white center>
            Cadastra-se
          </Text>
        </Button>
      </Block>
    </Block>

    </KeyboardAvoidingView>
  );
}
