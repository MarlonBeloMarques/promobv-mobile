import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, FlatList, StyleSheet } from "react-native";
import { Block, Text, Button, Header, Photo } from "../../elements";
import { Insert, Categories } from "../../components";
import { theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";

import { } from "./styles";
import { getCategories } from "../../services/category";
import { getPromotions, getPromotionsByCategory } from "../../services/promotion";
import { AsyncStorage } from "react-native";

export default function PasswordScreen(props) {

  const [value, setValue] = useState({
    id: 0,
    nome: "Geral",
  });

  const [promotions, setPromotions] = useState([]);
  const [showInsert, setShowInsert] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      getCategories().then((res) => {
        setCategories(res.data);
      });
    }

    loadCategoriesGeneral()
    loadCategories()
  }, []);

  async function loadCategoriesGeneral() {
    getPromotions().then((res) => {
      setPromotions(res.data["content"]);
    });

    AsyncStorage.setItem("category", JSON.stringify(value));
  }

  async function onClickGetPromotionsByCategory() {

    await AsyncStorage.getItem('category').then(res => {
      let obj = JSON.parse(res)
      setValue({ id: obj.id, nome: obj.nome })

      
    })
    console.log(value.id);
    
    if(value.id != 0) {
      console.log('entrou')
      getPromotionsByCategory(value.id).then(res => {
          setPromotions(res.data['content'])
      })
    }
    else {
      //loadCategoriesGeneral()
    }
  }

  async function onDetailsClicked(id) {
    
    props.navigation.navigate("Detalhes", { id });
  }

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer())
  }

  function onClickInsert() {
    setShowInsert(true)
  }

  function onHideInsert() {
    setShowInsert(false)
  }

  function onClickCategory() {
    setShowCategories(true);
  }

  function onHideCategory() {
    setShowCategories(false);
    onClickGetPromotionsByCategory()
  }

  function renderInsert() {
    return (
      <Insert
        modal={true}
        visible={showInsert}
        onRequestClose={onHideInsert}>
      </Insert>
    )
  }

  function renderCategories() {
    return (
      <Categories
        categories={categories}
        visible={showCategories}
        onRequestClose={onHideCategory}>
      </Categories>
    )
  }

  function renderPromotions() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header barStyle='light-content' colorIcon={theme.colors.white} color={theme.colors.primary} onPress={onClickMenu}>Promoções</Header>
        <Block border center flex={false} padding={[15, 0, 15]}>
          <Button onPress={onClickCategory} style>
            <Text bold color={theme.colors.primary}>
              {value.nome}
            </Text>
          </Button>
        </Block>

        <Block fixed>
          <Button
            onPress={onClickInsert}
            disableRadiusDefault
            radius={theme.sizes.radius * 4}
            color={theme.colors.secondary}
          >
            <Block row padding={[0, theme.sizes.base * 2]} flex={false}>
              <Block padding={[0, 10, 0, 0]} flex={false}>
                <AntDesign
                  name={"pluscircleo"}
                  size={15}
                  color={theme.colors.gray3}
                />
              </Block>
              <Text white>Inserir promoção</Text>
            </Block>
          </Button>
        </Block>

        <FlatList
          style={styles.flatlist}
          data={promotions}
          keyExtractor={post => String(post.id)}
          renderItem={({ item }) => (
            <Block
              onPress={() => onDetailsClicked(item.id)}
              button
              size={140}
              flex={false}
              row
              border
            >
              <Photo height={100} size={40} image={item.imagem} />
              <Block padding={[15, 10, 0]}>
                <Text gray bold size={18}>
                  {item.titulo}
                </Text>
                <Block style={styles.end}>
                  <Text secondary size={15} bold>
                    {"R$ "}{item.preco}
                  </Text>
                  <Block padding={[5, 0, 0]} flex={false}>
                    <Text gray3 bold>
                      {item.localizacao}
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          )}
        ></FlatList> 
      </KeyboardAvoidingView>
    );
  }

  if(showInsert) {
    return renderInsert()
  }
  if(showCategories) {
    return renderCategories()
  }
  return renderPromotions()
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },

  end: {
    justifyContent: "flex-end",
    marginBottom: 10
  },

  flatlist: {
    zIndex: 1
  }
});