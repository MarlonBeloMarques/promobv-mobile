import React, { useState, useEffect } from "react";
import { Modal, FlatList } from "react-native";
import { Block, Text, Button, Header } from "../elements";
import { theme } from "../constants";

import { useDispatch } from 'react-redux'
import { setCategory } from '../store/modules/category/actions'

import { getCategories } from "../services/category";

export function Categories(props) {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    async function loadCategories() {
      getCategories().then((res) => {
        setCategories(res.data);
      });
    }

    loadCategories();
  }, []);

  async function sendCategory(_id, _nome) {
    dispatch(setCategory(_id, _nome))
    props.onRequestClose()
  }

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      onRequestClose={props.onRequestClose}
    >
      <Header barStyle='dark-content' colorIcon={theme.colors.white} color={theme.colors.white}>
        <Text gray>Categoria</Text>
      </Header>
      <Block flex={false} border padding={[theme.sizes.base]}>
        <Button onPress={() => sendCategory(0, "Geral")} style>
          <Text>Geral</Text>
        </Button>
      </Block>
      <FlatList
        data={categories}
        keyExtractor={(post) => String(post.id)}
        renderItem={({ item }) => (
          <Button onPress={() => sendCategory(item.id, item.nome)} style>
            <Block border padding={[theme.sizes.base]}>
              <Text>{item.nome}</Text>
            </Block>
          </Button>
        )}
      ></FlatList>
      <Block flex={false} padding={[theme.sizes.padding]}>
        <Button onPress={props.onRequestClose} color={theme.colors.primary}>
          <Text bold center white>
            Voltar
          </Text>
        </Button>
      </Block>
    </Modal>
  );
};

Categories.propTypes = {
  visible: false,
  onRequestClose: () => {},
};

export default Categories;
