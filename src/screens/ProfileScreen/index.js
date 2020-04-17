import React, { useState, useEffect } from "react";
import { Block, Input, Button, Text, Photo } from "../../elements";
import { theme } from "../../constants";
import * as SecureStore from "expo-secure-store";

import profileImage from '../../../assets/images/profile-image.png'
import styles from './styles'

import { ScrollView } from "react-native-gesture-handler";

import { getUser, updateUser } from "../../services/user";

export default function ProfileScreen(props) {

  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [cpf, setCpf] = useState('')
  const [avatar, setAvatar] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    async function loadProfile() {

      const email = await SecureStore.getItemAsync('user_email')

      getUser(JSON.parse(email)).then((res) => {
        const response = res.data;

        console.log(response)

        setId(response.id)
        setName(response.nome)
        setNickname(response.apelido)
        setCpf(response.cpf)
        setAvatar(response.urlProfile)
        setDateOfBirth(response.dataDeNascimento)
        setNumber(response.telefone)
        setEmail(response.email)
      });
    }

    loadProfile();
  }, []);

  async function handleSubmit() {
    updateUser(id, name, cpf, number, dateOfBirth)
  }

  return (
    <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
      <Block
        padding={[0, theme.sizes.padding]}
        space="between"
        color={theme.colors.white}
      >
        <Block padding={[theme.sizes.padding, 0, 0, 0]} center row>
          <Button style>
            {avatar === null && <Photo avatar image={profileImage} />}
            {avatar !== null && <Photo avatar image={avatar} />}          
          </Button>
          <Block margin={[0, 0, 0, theme.sizes.header]}>
            <Text gray>Inserir imagem</Text>
          </Block>
        </Block>
        <Block margin={[theme.sizes.header, 0]} flex={false}>
          <Input
            label="Nome completo"
            style={[styles.input]}
            defaultValue={name}
            onChangeText={setName}
          />
          <Input 
            label="CPF" 
            style={[styles.input]} 
            defaultValue={cpf} 
            onChangeText={setCpf}/>
            
          <Input
            label="Telefone"
            style={[styles.input]}
            defaultValue={number}
            onChangeText={setNumber}
          />
        </Block>

        <Block row>
          <Block padding={[0, theme.sizes.padding * 6, 0, 0]}>
            <Input
              label="Data de nascimento"
              style={[styles.input]}
              defaultValue={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
          </Block>
        </Block>

        <Block padding={[theme.sizes.padding, 0]}>
          <Button onPress={handleSubmit} color={theme.colors.primary}>
            <Text bold center white>
              Alterar
            </Text>
          </Button>
        </Block>
      </Block>
    </ScrollView>
  );
}
