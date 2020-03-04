import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, FlatList, StyleSheet, View } from "react-native";
import { Block, Text, Button, Header, Photo } from "../../elements";
import { theme } from "../../constants";

import { } from "./styles";
import { DrawerActions } from "react-navigation-drawer";

export default function PasswordScreen(props) {
  
  const [feed, setFeed] = useState([]);

  function onDetailsClicked() {
    props.navigation.navigate("Detalhes");
  }

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
          <Block onPress={onDetailsClicked} button size={140} flex={false} row border>
            <Photo size={40} image={item.image}/>
            <Block padding={[15, 10, 0]}>
              <Text gray bold size={18}>{item.author.name}</Text>
              <Block style={styles.end}>
                <Text secondary size={15} bold> {item.price}</Text>
                <Block padding={[5, 0, 0]} flex={false}>
                  <Text gray3 bold> {item.description}</Text>
                </Block>
              </Block>
            </Block>
          </Block>
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