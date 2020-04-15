import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, FlatList, StyleSheet } from "react-native";
import { Block, Input, Button, Text, Photo, Header } from "../../elements";
import { theme } from "../../constants";
import { getNotifications } from '../../services/notification'

import profile from "../../../assets/images/profile-image.png";

import { DrawerActions } from "react-navigation-drawer";

export default function NotificationsScreen(props) {
  const [notifications, setNotifications] = useState([]);

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  useEffect(() => {
    async function loadNotifications() {
      getNotifications().then(res => {
        setNotifications(res.data['content'])
      })
    }
    //executa uma unica vez
    loadNotifications();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header onPress={onClickMenu} color={theme.colors.white}>
        <Text gray>Notificações</Text>
      </Header>

      <FlatList
        style={styles.flatlist}
        data={notifications}
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
              <Photo avatar image={profile} />
            </Block>
            <Block>
              <Text gray size={14}>
                {item.tipo === 1 && 
                  <>
                    {item.userApelido} curtiu a sua promoção {item.promoTitulo}.
                  </>
                }
                {item.tipo === 2 && 
                  <>
                    {item.userApelido} denunciou a sua promoção {item.promoTitulo}.
                  </>
                }
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
