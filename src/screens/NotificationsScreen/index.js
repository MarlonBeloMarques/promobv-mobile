import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, FlatList, StyleSheet } from "react-native";
import { Block, Input, Button, Text, Photo, Header } from "../../elements";
import { theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

import { DrawerActions } from "react-navigation-drawer";

export default function NotificationsScreen(props) {
  const [feed, setFeed] = useState([]);

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

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

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header onPress={onClickMenu} color={theme.colors.white}>
        <Text gray>Notificações</Text>
      </Header>

      <FlatList
        style={styles.flatlist}
        data={feed}
        keyExtractor={post => String(post.id)}
        renderItem={({ item }) => (
          <Block
            onPress={() => onDetailsClicked(item.id)}
            size={60}
            flex={false}
            row
            border
            center
          >
            <Block flex={false} padding={[0, theme.sizes.base]}>
              <Photo avatar image={item.author.avatar} />
            </Block>
            <Block>
              <Text gray size={14}>
                {item.author.name} curtiu a sua promoção.
              </Text>
            </Block>
          </Block>
        )}
      ></FlatList>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.white
  },

  end: {
    justifyContent: "flex-end",
    marginBottom: 10
  },

  flatlist: {
    zIndex: 1
  }
});
