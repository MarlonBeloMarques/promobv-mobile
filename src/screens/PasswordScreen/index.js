import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Block, Input, Button, Text } from "../../elements";
import CheckboxFormX from "react-native-checkbox-form";
import { theme } from "../../constants";

import styles from "./styles";

export default function PasswordScreen(props) {
  const [email, setEmail] = useState("promobv@react.com");

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h3 style={{ marginTop: theme.sizes.h1 }} gray bold center>
          Esqueceu sua senha?
        </Text>
        <Text light gray center style={{ marginTop: theme.sizes.h1 }}>
          Insira seu e-mail e encaminharemos um e-mail para que você possa
          recuperar seu acesso.
        </Text>

        <Block margin={[theme.sizes.base, 0]}>
          <Input label="E-mail" />
          <Block margin={[theme.sizes.base, 0]} flex={false}>
            <Button color={theme.colors.primary}>
              <Text bold white center>
                Receber instruções
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}
