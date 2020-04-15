import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, FlatList, StyleSheet, Platform } from "react-native";
import { Block, Input, Button, Text, Photo, Header } from "../../elements";
import { theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { getMyPromotions } from "../../services/promotion";

export default function MyPromotionsScreen(props) {

  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    async function loadPromotions() {
      getMyPromotions().then(res => {
        setPromotions(res.data)
      })
    }
    //executa uma unica vez
    loadPromotions()
  }, []);

  console.log(promotions)

  async function onDetailsClicked(id) {
    const _id = id;

    await AsyncStorage.setItem("promotion", JSON.stringify(_id));

    props.navigation.navigate("Detalhes", { id });
  }

  function onClickEdit() {
    props.navigation.navigate("Editar")
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        data={promotions}
        keyExtractor={post => String(post.id)}
        renderItem={({ item }) => (
          <Block
            margin={[theme.sizes.base, theme.sizes.padding]}
            onPress={() => onDetailsClicked(item.id)}
            button
            size={115}
            flex={false}
            row
            card
            shadow
            color={theme.colors.white}
          >
            <Photo
              style={Platform.OS === "ios" && styles.radius}
              height={100}
              size={20}
              image={item.imagem}
            />
            <Block padding={[15, 10, 0]}>
              <Text gray bold size={14}>
                {item.titulo}
              </Text>
              <Block style={styles.end}>
                <Text secondary size={12} bold>
                  {'R$ '}{item.preco}
                </Text>
                <Block padding={[5, 0, 0]} flex={false}>
                  <Text gray3 bold>
                    {item.localizacao}
                  </Text>
                </Block>
              </Block>
            </Block>
            <Block column flex={false} padding={theme.sizes.base / 2}>
              <Button style>
                <AntDesign
                  name={"close"}
                  size={18}
                  color={theme.colors.gray3}
                />
              </Button>
              <Block bottom>
                <Button style onPress={onClickEdit}>
                  <AntDesign
                    name={"edit"}
                    size={18}
                    color={theme.colors.gray3}
                  />
                </Button>
              </Block>
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

  radius: {
    borderBottomStartRadius: theme.sizes.radius * 2,
    borderTopStartRadius: theme.sizes.radius * 2
  },

  end: {
    justifyContent: "flex-end",
    marginBottom: 10
  }
});
