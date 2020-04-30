import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, FlatList, StyleSheet, Platform } from "react-native";
import { Block, Button, Text, Photo } from "../../elements";
import { theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { getMyPromotions, deletePromotion } from "../../services/promotion";
import * as SecureStore from "expo-secure-store";

import no_photo from "../../../assets/images/no-photo.png";
import { Alert } from "react-native";
import { checkReports } from "../../services/notification";
import { getUser } from "../../services/user";
import AlertMessage from "../../components/Alert";

export default function MyPromotionsScreen(props) {

  const [promotions, setPromotions] = useState([]);
  const [userId, setUserId] = useState(0)

  useEffect(() => {
    async function checkReportsPromotions() {

      try {
        let email = await SecureStore.getItemAsync('user_email')
  
        await getUser(JSON.parse(email)).then((res) => {
          const response = res.data;
          setUserId(response.id)
        })
  
        await checkReports(userId).then(res => {
          const response = res.data
          if(res.status === 200) {
            AlertMessage({
              title: 'Atenção',
              message: `${response}`
            })
          }
        })

      } catch ({response}) {
        
      }
    }

    //executa uma unica vez
    loadPromotions()
    checkReportsPromotions()
  }, []);

  async function loadPromotions() {
    getMyPromotions().then(
      (res) => {
        setPromotions(res.data);
      },
      function ({ response }) {}
    );
  }

  async function deletePromotionClicked(id) {
    Alert.alert(
      'Atenção',
      'Tem certeza que deseja excluir essa promoção?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            deletePromotion(id).then(res => {}, function({response}) {   })
            loadPromotions()
          }
        }
      ]
    )
  }

  async function onDetailsClicked(id) {
    const _id = id;

    await AsyncStorage.setItem("promotion", JSON.stringify(_id));

    props.navigation.navigate("Detalhes", { id });
  }

  async function onClickEdit(id) {
    const _id = id;

    await AsyncStorage.setItem("promotion", JSON.stringify(_id));
    
    props.navigation.navigate("Editar", { id })
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
            {item.imagem === null && 
              <Photo
                style={Platform.OS === "ios" && styles.radius}
                height={100}
                size={20}
                image={no_photo}
              />
            }
            {item.imagem !== null && 
              <Photo
                style={Platform.OS === "ios" && styles.radius}
                height={100}
                size={20}
                image={item.imagem}
              />
            }
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
              <Button onPress={() => deletePromotionClicked(item.id)} style>
                <AntDesign
                  name={"close"}
                  size={18}
                  color={theme.colors.gray3}
                />
              </Button>
              <Block bottom>
                <Button style onPress={() => onClickEdit(item.id)}>
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
