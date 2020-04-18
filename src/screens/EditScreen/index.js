import React, { useState, useEffect } from "react";
import { Modal, StyleSheet } from "react-native";
import { Block, Text, Button, Input, Header } from "../../elements";
import { theme } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

import { getPromotion } from "../../services/promotion";

import { DrawerActions } from "react-navigation-drawer";

export default function Edit(props) {
  const id = props.navigation.getParam("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [value, setValue] = useState('');
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function loadPromotion() {
      getPromotion(id).then(res => {
        const response = res.data

        console.log(response);
        
        setTitle(response.titulo)
        setDescription(response.descricao)
        setPlace(response.localizacao)
        setAddress(response.endereco)
        setTelephone(response.userTelefone)
        setValue(response.preco.toString())
        setCategory('')
      })
    }

    loadPromotion()
  }, []);

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  return (
    <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
      <Block
        padding={[0, theme.sizes.padding]}
        space="between"
        color={theme.colors.white}
      >
        <Block margin={[theme.sizes.header, 0]} flex={false}>
          <Input label="Titulo" style={[styles.input]} defaultValue={title} />
          <Input
            label="Descrição"
            style={[styles.input]}
            defaultValue={description}
          />
          <Input label="Local" style={[styles.input]} defaultValue={place} />
          <Input
            label="Endereço"
            style={[styles.input]}
            defaultValue={address}
          />
          <Input
            label="Telefone"
            style={[styles.input]}
            defaultValue={telephone}
          />

          <Block row>
            <Block padding={[0, theme.sizes.padding, 0, 0]}>
              <Input
                label="Valor"
                style={[styles.input]}
                defaultValue={value}
              />
            </Block>

            <Block>
              <Input
                label="Categoria"
                style={[styles.input]}
                defaultValue={category}
              />
            </Block>
          </Block>
        </Block>

        <Block row>
          <Block flex={false}>
            <Text bold gray>
              Galeria
            </Text>
            <Button style={styles.plus}>
              <Text h3 gray>
                +5
              </Text>
            </Button>
          </Block>
        </Block>

        <Block middle padding={[theme.sizes.padding / 2, 0]}>
          <Button onPress={props.onRequestClose} color={theme.colors.primary}>
            <Text bold center white>
              Atualizar
            </Text>
          </Button>
        </Block>
      </Block>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.gray3
  },

  plus: {
    backgroundColor: theme.colors.gray2,
    padding: 20,
    borderRadius: theme.sizes.radius,
    marginHorizontal: 10,
    marginTop: 10
  }
});
