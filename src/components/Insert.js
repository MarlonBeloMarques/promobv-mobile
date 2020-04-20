import React, { useState, useEffect } from "react";
import { Modal, StyleSheet } from "react-native";
import { Block, Text, Button, Input, Header } from "../elements";
import { theme } from "../constants";
import { ScrollView } from "react-native-gesture-handler";

import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../store/modules/category/actions";

import { DrawerActions } from "react-navigation-drawer";

import Categories from './Categories'

export default function Insert(props) {
  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.category, () => true);

  const[titulo, setTitulo] = useState('')
  const[descricao, setDescricao] = useState('')
  const[local, setLocal] = useState('')
  const[endereco, setEndereco] = useState('')
  const[telefone, setTelefone] = useState('')
  const[valor, setValor] = useState('')
  const[categoria, setCategoria] = useState('')

  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(setCategory(0, "Geral"));
    };
  });

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  function buttonAction(title) {
    return (
      <Block padding={[theme.sizes.padding, 0]}>
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

    function onClickCategory() {
    setShowCategories(true);
    }

    function onHideCategory() {
      setShowCategories(false);
    }

    function renderCategories() {
      return (
        <Categories
          visible={showCategories}
          onRequestClose={onHideCategory}
        ></Categories>
      );
    }
    
    function renderContentPattern(title, activeIcon) {

      return (
        <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
          {header(activeIcon)}
          <Block
            padding={[0, theme.sizes.padding]}
            space="between"
            color={theme.colors.white}
          >
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

                <Block margin={[theme.sizes.base / 1.5, 0]}>
                  <Block padding={[0,0, theme.sizes.base - 10, 4]} flex={false}>
                    <Text gray>
                      Categoria
                    </Text>
                  </Block>
                  <Button onPress={onClickCategory} style={styles.button}>
                    <Text gray>
                      {name}
                    </Text>
                  </Button>
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

    if (showCategories) {
      return renderCategories();
    }
    return renderContentPattern(title, activeIcon);
    
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
  plus: {
    backgroundColor: theme.colors.gray2,
    padding: 20,
    borderRadius: theme.sizes.radius,
    marginHorizontal: 10,
    marginTop: 10,
  },
  button: {
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    paddingLeft: theme.sizes.base - 6,
  },
  profile: {
    width: 50,
    height: 50,
  },
});
