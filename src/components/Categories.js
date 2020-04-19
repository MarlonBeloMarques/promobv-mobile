import React, { useState } from "react";
import { Modal, FlatList, AsyncStorage } from "react-native";
import { Block, Text, Button, Header } from "../elements";
import { theme } from "../constants";

export function Categories(props) {

  const [categories, setCategories] = useState(props.categories)

  async function sendCategory(_id, _nome) {
    await AsyncStorage.setItem('category', JSON.stringify({ id: _id, nome: _nome }))
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
