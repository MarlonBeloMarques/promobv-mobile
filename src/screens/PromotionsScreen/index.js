import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, FlatList, StyleSheet, View } from "react-native";
import { Block, Text, Button, Header } from "../../elements";
import { theme } from "../../constants";

import { Post, HeaderStyled, Avatar, Name, PostImage, Localization, Price } from "./styles";
import { DrawerActions } from "react-navigation-drawer";

export default function PasswordScreen(props) {
  
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function loadFeed() {
      const response = await fetch(
        "http://localhost:3000/feed?_expand=author&_limit=5&_page=1"
      );

      const data = await response.json();

      setFeed(data);
    }
    //executa uma unica vez
    loadFeed();
  }, []);

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
   <KeyboardAvoidingView style={styles.container}>
     <Header onPress={onClickMenu}>Promoções</Header>
     <Block border center flex={false} padding={[15, 0, 15]}>
       <Button style>
         <Text bold color={theme.colors.primary}>Categoria</Text>
       </Button>
     </Block>

      <FlatList
        data={feed}
        keyExtractor={post => String(post.id)}
        renderItem={({item}) => (
          <Post>
            <PostImage source={{uri: item.image}} />
            <Block>
              <Name>{item.author.name}</Name>
              <Block style={styles.end}>
                <Price> {item.price}</Price>
                <Localization> {item.description}</Localization>
              </Block>
            </Block>
          </Post>
        )}>
      </FlatList>
</KeyboardAvoidingView>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },

  end: {
    justifyContent: "flex-end",
    marginBottom: 10
  }
});