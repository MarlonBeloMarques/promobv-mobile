import React, { useState, useEffect } from "react";
import { Modal, StyleSheet } from "react-native";
import { Block, Text, Button, Input, Header } from "../../elements";
import { theme } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

import { getPromotion, updatePromotion } from "../../services/promotion";
import { getCategories } from "../../services/category";

import { DrawerActions } from "react-navigation-drawer";
import { Categories } from "../../components";

export default function Edit(props) {
  const id = props.navigation.getParam("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState('');

  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([]);

  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    async function loadPromotion() {
      getPromotion(id).then(res => {
        const response = res.data

        console.log(response);
        
        setTitle(response.titulo)
        setDescription(response.descricao)
        setPlace(response.localizacao)
        setAddress(response.endereco)
        setValue(response.preco.toString())

        setCategoryId(response.categoria.id)
        setCategoryName(response.categoria.nome)
      })
    }

    async function loadCategories() {
      getCategories().then((res) => {
        setCategories(res.data);
      });
    }

    loadPromotion()
    loadCategories()
  }, []);

  function handleSubmit() {
    updatePromotion(id, description, value, place, address, title, idCategoria)
  }

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  function onClickCategory() {
    setShowCategories(true);
  }

  function onHideCategory() {
    setShowCategories(false);
  }

  function renderCategories() {
    return (
      <Categories
        categories={categories}
        visible={showCategories}
        onRequestClose={onHideCategory}
      ></Categories>
    );
  }

  function renderEdit() { 

    return (
      <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
        <Block
          padding={[0, theme.sizes.padding]}
          space="between"
          color={theme.colors.white}
        >
          <Block margin={[theme.sizes.header, 0]} flex={false}>
            <Input label="Titulo" defaultValue={title} />
            <Input
              label="Descrição"
              defaultValue={description}
            />
            <Input label="Local" style={[styles.input]} defaultValue={place} />
            <Input
              label="Endereço"
              defaultValue={address}
            />

            <Block row>
              <Block padding={[0, theme.sizes.padding, 0, 0]}>
                <Input
                  label="Valor"
                  defaultValue={value}
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
                    Auto peças
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

  if (showCategories) {
    return renderCategories()
  }
  return renderEdit()
  
}

const styles = StyleSheet.create({
  plus: {
    backgroundColor: theme.colors.gray2,
    padding: 20,
    borderRadius: theme.sizes.radius,
    marginHorizontal: 10,
    marginTop: 10,
  },

  button: {
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    paddingLeft: theme.sizes.base -6
  },
});
