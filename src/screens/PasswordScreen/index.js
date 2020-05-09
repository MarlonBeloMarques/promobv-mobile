import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";
import { Block, Input, Button, Text } from "../../elements";
import { theme } from "../../constants";
import { DotsLoader } from "react-native-indicator";

import { checkEmail, newPassword } from "../../services/auth";
import AlertMessage from "../../components/Alert";
import { Keyboard } from "react-native";

export default function PasswordScreen(props) {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loader, setLoader] = useState(false);

  const confirmPasswordRef = useRef();

  function checkEmailUser() {
    setLoader(true)
    checkEmail(email).then(res => {
      let response = res.data
       if(response) {
         setLoader(false)
         setChecked(true)
       }
    })
  }

  async function handleSubmit() {
    if(email !== '' && password !== '' && confirmPassword !== '') {
      if(password === confirmPassword) {
        setLoader(true)
        await newPassword(email, password).then(res => {
          console.log(res.status)
          if(res.status === 204) {
            AlertMessage({
              title: "Sucesso",
              message: "Verifique seu e-mail para finalizar a atualização.",
            });

            setLoader(false)
            Keyboard.dismiss();
            props.navigation.navigate('login')
          }
        }, function() {
          setLoader(false)
        })
      } else {
        AlertMessage({
          title: 'Atenção',
          message: 'Verifique se as senhas estão iguais.'
        })
      }
    } else {
      AlertMessage({
        title: 'Atenção',
        message: 'Verifique se os campos estão todos preenchidos.'
      })
    }
   
    Keyboard.dismiss();
  }

  function renderTitleButton() {
    if(!checked && !loader) {
      return (
        <Text bold white center>
          Verificar e-mail
        </Text>
      )
    }  
    if(checked && !loader) {
      return (
        <Text bold white center>
          Encaminhar e-mail
        </Text>
      )
    }  
  }

  return (
    <ScrollView
      backgroundColor="white"
      showsVerticalScrollIndicator={false}>
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h3 style={{ marginTop: theme.sizes.h1 }} gray bold center>
          Esqueceu sua senha?
        </Text>
        <Text light gray center style={{ marginTop: theme.sizes.h1 }}>
          Insira seu e-mail e encaminharemos um e-mail para que você possa
          atualizar sua senha.
        </Text>

        <Block flex={false} padding={[theme.sizes.base, 0]}>
          <Input
            label="E-mail"
            defaultValue={email}
            onChangeText={setEmail}
            done
            submitEditing={checkEmailUser}
          />
          {checked && (
            <>
              <Input
                secure
                label="Senha"
                defaultValue={password}
                onChangeText={setPassword}
                next
                submitEditing={() => confirmPasswordRef.current.focus()}
              />
              <Input
                secure
                label="Confirmar senha"
                defaultValue={confirmPassword}
                onChangeText={setConfirmPassword}
                reference={confirmPasswordRef}
                done
                submitEditing={handleSubmit}
              />
            </>
          )}
          <Block margin={[theme.sizes.base, 0]} flex={false}>
            <Button
              onPress={() => {
                checked === true ? handleSubmit() : checkEmailUser();
              }}
              color={theme.colors.primary}
            >
              {loader && (
                <Block flex={false} center>
                  <DotsLoader color={theme.colors.white} size={10} />
                </Block>
              )}
              {renderTitleButton()}
            </Button>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}
