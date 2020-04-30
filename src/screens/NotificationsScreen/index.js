import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, FlatList, StyleSheet } from "react-native";
import { Block, Text, Photo, Header } from "../../elements";
import { theme } from "../../constants";
import { getNotifications, checkReports } from '../../services/notification'
import * as SecureStore from "expo-secure-store";

import profile from "../../../assets/images/profile-image.png";

import { DrawerActions } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../../services/user";
import AlertMessage from "../../components/Alert";

export default function NotificationsScreen(props) {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(0)

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  useEffect(() => {
    async function checkReportsPromotions() {

      try {
        let email = await SecureStore.getItemAsync("user_email");
  
        await getUser(JSON.parse(email)).then((res) => {
          const response = res.data;
          setUserId(response.id);
        });
  
        await checkReports(userId).then((res) => {
          const response = res.data;

          if (res.status === 200) {
            AlertMessage({
              title: "Atenção",
              message: `${response}`,
            });
          }
        });
      } catch ({response}) {
        
      }
    }

    async function loadNotifications() {
      getNotifications().then(res => {
      setNotifications(res.data['content'])
      }, function({response}) {

      })
    }
    //executa uma unica vez
    loadNotifications();
    checkReportsPromotions();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header barStyle='dark-content' onPress={onClickMenu} color={theme.colors.white}>
        <Text gray>Notificações</Text>
      </Header>

      {notifications.length === 0 && 
        <Block center margin={[theme.sizes.padding * 4, 0]}>
          <Block flex={false} padding={theme.sizes.padding}>
            <Ionicons name={'ios-notifications'} color={theme.colors.gray3} size={40}/>
          </Block>
          <Text gray3>
            Você não possui notificações no momento.
          </Text>
        </Block>
      }
      {notifications.length !== 0 && 
        <FlatList
          style={styles.flatlist}
          data={notifications}
          keyExtractor={(post) => String(post.id)}
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
                  {item.tipo === 1 && (
                    <>
                      <Block style={styles.icon}>
                        <Ionicons
                          name={"ios-heart"}
                          size={16}
                          color={theme.colors.accent}
                        />
                      </Block>
                      {item.userUrlProfile === null && <Photo avatar image={profile} />}
                      {item.userUrlProfile !== null && <Photo avatar image={item.userUrlProfile} />}
                  </>
                  )}
                  
                  {item.tipo === 2 && (
                    <Block flex={false} padding={[0, theme.sizes.caption/2]}>
                      <Ionicons
                        name={"ios-information-circle"}
                        size={30}
                        color={theme.colors.secondary}
                      />
                    </Block>
                  )}
              </Block>
              <Block>
                <Text gray size={14}>
                  {item.tipo === 1 && (
                    <>
                      {item.userApelido} curtiu a sua promoção {item.promoTitulo}.
                    </>
                  )}
                  {item.tipo === 2 && (
                    <>
                      Sua promoção{" "}
                      {item.promoTitulo} foi denunciada.
                    </>
                  )}
                </Text>
              </Block>
            </Block>
          )}
        ></FlatList>
      }
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },

  flatlist: {
    zIndex: 1
  },

  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 42,
    top: 22,
    backgroundColor: theme.colors.white,
    zIndex: 5,
    borderRadius: 15,
    height: 18,
    width: 18
  }
});
