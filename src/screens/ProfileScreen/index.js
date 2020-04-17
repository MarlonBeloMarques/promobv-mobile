import React, { useState, useEffect } from "react";
import { Block, Input, Button, Text, Photo } from "../../elements";
import { theme } from "../../constants";
import * as SecureStore from "expo-secure-store";

import profile from '../../../assets/images/profile-image.png'
import styles from './styles'

import { ScrollView } from "react-native-gesture-handler";

import { getUser } from "../../services/user";

export default function ProfileScreen(props) {

  const [profile, setProfile] = useState({
    id: 0,
    name: '',
    nickname: '',
    cpf: '',
    avatar: '',
    dateOfBirth: '',
    number: '',
    email: ''
  })

  useEffect(() => {
    async function loadProfile() {

      const email = await SecureStore.getItemAsync('user_email')

      getUser(JSON.parse(email)).then((res) => {
        const response = res.data;
        setProfile({
          id : response.id,
          name: response.nome,
          nickname : response.nickname,
          cpf: response.cpf,
          avatar: response.urlProfile,
          dateOfBirth: response.dataDeNascimento,
          number: response.telefone,
          email: response.email
        })
      });
    }

    loadProfile();
  }, []);

  console.log(profile)

  return (
    <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
      <Block
        padding={[0, theme.sizes.padding]}
        space="between"
        color={theme.colors.white}
      >
        <Block padding={[theme.sizes.padding, 0, 0, 0]} center row>
          <Button style>
            {profile.avatar === null && <Photo avatar image={profile} />}
            {profile.avatar !== null && <Photo avatar image={profile.avatar} />}          
          </Button>
          <Block margin={[0, 0, 0, theme.sizes.header]}>
            <Text gray>Inserir imagem</Text>
          </Block>
        </Block>
        <Block margin={[theme.sizes.header, 0]} flex={false}>
          <Input
            label="Nome completo"
            style={[styles.input]}
            defaultValue={profile.name}
          />
          <Input label="CPF" style={[styles.input]} defaultValue={profile.cpf} />
          <Input
            label="Telefone"
            style={[styles.input]}
            defaultValue={profile.telefone}
          />
        </Block>

        <Block row>
          <Block padding={[0, theme.sizes.padding * 6, 0, 0]}>
            <Input
              label="Data de nascimento"
              style={[styles.input]}
              defaultValue={profile.dateOfBirth}
            />
          </Block>
        </Block>

        <Block padding={[theme.sizes.padding, 0]}>
          <Button onPress={props.onRequestClose} color={theme.colors.primary}>
            <Text bold center white>
              Alterar
            </Text>
          </Button>
        </Block>
      </Block>
    </ScrollView>
  );
}
