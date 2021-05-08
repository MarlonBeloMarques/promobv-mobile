import React, { useState, useEffect } from "react";
import { Modal, FlatList } from "react-native";
import { Block, Text, Button } from "../elements";
import Header from './Header';
import { theme } from "../constants";

import { useDispatch } from 'react-redux'
import { setCategoryPromotions } from '../store/modules/category/promotions/actions'

import { getCategories } from "../services/category";
import { setCategoryUpdateAndInsert } from "../store/modules/category/updateAndInsert/actions";

export function Categories(props) {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    async function loadCategories() {
      getCategories().then((res) => {
        setCategories(res.data);
      }, function({response}) {

      })
    }

    loadCategories();
  }, []);

  async function sendCategory(_id, _nome) {
    if(props.screenPromotions === true) 
      dispatch(setCategoryPromotions(_id, _nome))
    else 
      dispatch(setCategoryUpdateAndInsert(_id, _nome)) 

    props.onRequestClose()
  }
  

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      onRequestClose={props.onRequestClose}
    >
      <Header barStyle='dark-content' colorIcon={theme.colors.white} color={theme.colors.white}>
        <Text h3 gray bold>Categoria</Text>
      </Header>
      {props.screenPromotions === true && 
        <Block flex={false} border padding={[theme.sizes.base]}>
          <Button onPress={() => sendCategory(0, "Geral")} style>
            <Text>Geral</Text>
          </Button>
        </Block>
      }
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

Categories.defaultProps = {
  screenPromotions: false,
  visible: false,
  onRequestClose: () => {},
};

export default Categories;
