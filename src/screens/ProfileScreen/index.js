import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, FlatList, StyleSheet, Image } from "react-native";
import { Block, Input, Button, Text, Photo, Header } from "../../elements";
import { theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

import profile from '../../../assets/images/profile-image.png'
import styles from './styles'

import { ScrollView } from "react-native-gesture-handler";

export default function ProfileScreen(props) {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
  const [telefone, setTelefone] = useState("");

  return (
    <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
      <Block
        padding={[0, theme.sizes.padding]}
        space="between"
        color={theme.colors.white}
      >
        <Block padding={[theme.sizes.padding, 0, 0, 0]} center row>
          <Button style>
            <Image source={profile} style={styles.profile} />
          </Button>
          <Block margin={[0, 0, 0, theme.sizes.header]}>
            <Text gray>Inserir imagem</Text>
          </Block>
        </Block>
        <Block margin={[theme.sizes.header, 0]} flex={false}>
          <Input
            label="Nome completo"
            style={[styles.input]}
            defaultValue={nome}
          />
          <Input label="CPF" style={[styles.input]} defaultValue={cpf} />
          <Input
            label="Telefone"
            style={[styles.input]}
            defaultValue={telefone}
          />
        </Block>

        <Block row>
          <Block padding={[0, theme.sizes.padding * 6, 0, 0]}>
            <Input
              label="Data de nascimento"
              style={[styles.input]}
              defaultValue={dataDeNascimento}
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
