import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, FlatList, StyleSheet, View, AsyncStorage } from "react-native";
import { Block, Text, Button, Header, Photo } from "../../elements";
import { Insert } from "../../components";
import { theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

import { } from "./styles";

import { DrawerActions } from "react-navigation-drawer";

export default function PasswordScreen(props) {
  
  const [feed, setFeed] = useState([]);
  const [showInsert, setShowInsert] = useState(false);

  useEffect(() => {
    async function loadFeed() {
      const response = await fetch(
        "http://192.168.4.10:3000/feed?_expand=author&_limit=5&_page=1"
      );

      const data = await response.json();

      setFeed(data);
    }
    //executa uma unica vez
    loadFeed();
  }, []);

  async function onDetailsClicked(id) {

  const _id = id;

  await AsyncStorage.setItem('promotion', JSON.stringify(_id))
   
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

  function renderInsert() {
    return (
      <Insert
        modal={true}
        visible={showInsert}
        onRequestClose={onHideInsert}>
      </Insert>
    )
  }

  function renderPromotions() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header barStyle='light-content' colorIcon={theme.colors.white} color={theme.colors.primary} onPress={onClickMenu}>Promoções</Header>
        <Block border center flex={false} padding={[15, 0, 15]}>
          <Button style>
            <Text bold color={theme.colors.primary}>
              Categoria
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
          data={feed}
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
              <Photo height={100} size={40} image={item.image} />
              <Block padding={[15, 10, 0]}>
                <Text gray bold size={18}>
                  {item.description}
                </Text>
                <Block style={styles.end}>
                  <Text secondary size={15} bold>
                    {" "}
                    {item.price}
                  </Text>
                  <Block padding={[5, 0, 0]} flex={false}>
                    <Text gray3 bold>
                      {" "}
                      {item.description}
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