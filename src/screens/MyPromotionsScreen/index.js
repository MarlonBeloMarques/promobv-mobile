import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Block, Text } from "../../elements";
import { theme } from "../../constants";
import { SimpleLineIcons } from "@expo/vector-icons";
import { getMyPromotions, deletePromotion } from "../../services/promotion";
import * as SecureStore from "expo-secure-store";

import { Alert } from "react-native";
import { checkReports } from "../../services/notification";
import { getUser } from "../../services/user";
import AlertMessage from "../../components/Alert";
import { logout } from "../../services/auth";
import { MyPromotionCard } from "../../components";

export default function MyPromotionsScreen(props) {

  const [promotions, setPromotions] = useState([]);
  const [userId, setUserId] = useState(0)

  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    async function checkReportsPromotions() {

      try {
        let email = await SecureStore.getItemAsync('user_email')
        let message = await AsyncStorage.getItem("message");
  
        await getUser(JSON.parse(email)).then((res) => {
          const response = res.data;
          setUserId(response.id)
        })
  
        await checkReports(userId).then(res => {
          const response = res.data
         
          if (res.status === 200) { 
            if((message === null || parseInt(message) < response.length) && response.length != 0) {
              AlertMessage({
                title: "Atenção",
                message: `${response}`,
              });
            }

            AsyncStorage.setItem('message', JSON.stringify(response.length))
          }
        })

      } catch ({response}) {
        
      }
    }

    loadPromotions()
    checkReportsPromotions()
  }, []);

  async function loadPromotions() {
    await getMyPromotions().then(
      (res) => {
        setPromotions(res.data);
      },
      function ({ response }) {
        setRefresh(false)
        if (response.status === 403) {
          AlertMessage({
            title: "Atenção",
            message: "Sua sessão expirou.",
          });
          logout()
          props.navigation.navigate("login");
        }
      }
    );

    setLoading(false)
    setRefresh(false)
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

  function onRefresh() {
    setRefresh(true)
    loadPromotions()

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
      {loading === true && (
        <Block middle>
          <ActivityIndicator size="small" color="#00000" />
        </Block>
      )}
      {loading === false && (
        <>
          {promotions.length === 0 && (
            <Block center margin={[theme.sizes.padding * 4, 0]}>
              <Block flex={false} padding={theme.sizes.padding}>
                <SimpleLineIcons
                  name={"handbag"}
                  color={theme.colors.gray3}
                  size={40}
                />
              </Block>
              <Text gray3>
                Você não possui promoções publicadas no momento.
              </Text>
            </Block>
          )}
          {promotions.length !== 0 && (
            <FlatList
              onRefresh={onRefresh}
              refreshing={refresh}
              data={promotions}
              keyExtractor={(post) => String(post.id)}
              renderItem={({ item }) => (
                <MyPromotionCard 
                  item={item} 
                  deletePromotionClicked={deletePromotionClicked} 
                  onDetailsClicked={onDetailsClicked} 
                  onClickEdit={onClickEdit}/>
              )}
            ></FlatList>
          )}
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.white
  }
});
