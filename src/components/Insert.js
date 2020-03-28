import React, { useState } from "react";
import { Modal, StyleSheet, StatusBar, Image } from "react-native";
import { Block, Text, Button, Input, Header } from "../elements";
import { theme } from "../constants";
import { ScrollView } from "react-native-gesture-handler";

import { DrawerActions } from "react-navigation-drawer";

import profile from '../../assets/images/profile-image.png'

export default function Insert(props) {

  const[titulo, setTitulo] = useState('')
  const[descricao, setDescricao] = useState('')
  const[local, setLocal] = useState('')
  const[endereco, setEndereco] = useState('')
  const[telefone, setTelefone] = useState('')
  const[valor, setValor] = useState('')
  const[categoria, setCategoria] = useState('')

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  function buttonAction(title) {
    return (
      <Block middle padding={[theme.sizes.padding / 2, 0]}>
        <Button onPress={props.onRequestClose} color={theme.colors.primary}>
          <Text bold center white>
            {title}
          </Text>
        </Button>
      </Block>
    );
  }

  function header(activeIcon) {
    if(activeIcon) {
       return (
         <Header barStyle='dark-content' colorIcon={theme.colors.gray} onPress={onClickMenu} color={theme.colors.white}>
          <Text gray>Inserir</Text>
        </Header>
       )
    } else {
        return (
          <Header barStyle='dark-content' colorIcon={theme.colors.white} color={theme.colors.white}>
            <Text gray>Inserir</Text>
          </Header>
        );
    }
      
  }

  function contentPattern(title, activeIcon) {
    return (
      <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
        {header(activeIcon)}
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
              label="Titulo"
              style={[styles.input]}
              defaultValue={titulo}
            />
            <Input
              label="Descrição"
              style={[styles.input]}
              defaultValue={descricao}
            />
            <Input label="Local" style={[styles.input]} defaultValue={local} />
            <Input
              label="Endereço"
              style={[styles.input]}
              defaultValue={endereco}
            />
            <Input
              label="Telefone"
              style={[styles.input]}
              defaultValue={telefone}
            />

            <Block row>
              <Block padding={[0, theme.sizes.padding, 0, 0]}>
                <Input
                  label="Valor"
                  style={[styles.input]}
                  defaultValue={valor}
                />
              </Block>

              <Block>
                <Input
                  label="Categoria"
                  style={[styles.input]}
                  defaultValue={categoria}
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

          {buttonAction(title)}
        </Block>
      </ScrollView>
    );
  }

  function onModal(title) {
    return (
      <Modal
        visible={props.visible}
        animationType="slide"
        onRequestClose={props.onRequestClose}>
        {contentPattern(title)}
      </Modal>
    )
  }

  if (props.modal) {
    return onModal('Cancelar')
  } 
  else {
    return (
      contentPattern('Inserir', true)
    )
  }

};

Insert.propTypes = {
  visible: false,
  modal: false,
  onRequestClose: () => {}
};

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
  },

  profile: {
    width: 50,
    height: 50,
  }
});