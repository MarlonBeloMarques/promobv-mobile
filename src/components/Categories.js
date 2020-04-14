import React from "react";
import { Modal, ScrollView, FlatList } from "react-native";
import { Block, Text, Button, Header } from "../elements";
import PropTypes from "prop-types";
import { theme } from "../constants";

const Categories = (props) => {
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
        <Text>Geral</Text>
      </Block>
      <FlatList
        data={props.categories}
        keyExtractor={(post) => String(post.id)}
        renderItem={({ item }) => (
          <Button style>
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
