import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Block, Text, Button, Photo } from "../../elements";
import { Insert, Categories, PromotionCard, Header } from "../../components";
import { theme } from "../../constants";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";

import { } from "./styles";
import { getPromotions, getPromotionsByCategory } from "../../services/promotion";

import { useSelector, useDispatch } from "react-redux";

import no_photo from "../../../assets/images/no-photo.png";
import { refreshToken, successfulLogin } from "../../services/auth";
import { signInSuccess } from "../../store/modules/auth/actions";

export default function PromotionScreen(props) {
  const dispatch = useDispatch();
  const { idUser } = useSelector((state) => state.auth, () => true)
  const { id, name } = useSelector((state) => state.category_promotions, () => true);

  const [promotions, setPromotions] = useState([]);
  const [showInsert, setShowInsert] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)

  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function checkRefreshToken() {
      refreshToken().then((res) => {
        dispatch(signInSuccess(res.headers.authorization, idUser))
        successfulLogin(res.headers.authorization)
      }, function({response}) {

      });
    }

    checkRefreshToken()
  }, [])

  useEffect(() => {
    if(id != 0) {
      loadPromotionsByCategory()
    }
    else {
      loadPromotionsGeneral()
    }
  }, [showCategories])

  async function loadPromotionsByCategory(pageNumber = page) {
    if(total && pageNumber >= total)
      return;

    await getPromotionsByCategory(id, pageNumber, 10).then((res) => {
      const data = res.data['content'];
      const totalPages = res.data.totalPages

      setTotal(JSON.parse(totalPages))
      setPromotions([...promotions, ...data])
      setPage(pageNumber + 1)
      },
      function ({ response }) {}
    );
  }

  async function loadPromotionsGeneral(pageNumber = page) {
    if(total && pageNumber >= total) 
      return;

    await getPromotions(pageNumber, 10).then((res) => {
      const data = res.data["content"];
      const totalPages = res.data.totalPages;

      setTotal(JSON.parse(totalPages))
      setPromotions([...promotions, ...data])
      setPage(pageNumber + 1)
    }, function({response}) {
      
    });

    setLoading(false)
  }

  function clearDate() {
    setTotal(0);
    setPage(0);
    setPromotions([]);
  }

  async function onRefresh() {
    setRefresh(true)
    clearDate()

    if(id == 0) {
      getPromotions(0, 10).then((res) => {
        const data = res.data["content"];
        const totalPages = res.data.totalPages;
      
        setTotal(JSON.parse(totalPages))
        setPromotions(data)
        setPage(1)
        setRefresh(false);
      }, function({response}) {
          setRefresh(false); 
      });
    } else {
      getPromotionsByCategory(id, 0, 10).then((res) => {
        const data = res.data["content"];
        const totalPages = res.data.totalPages;
      
        setTotal(JSON.parse(totalPages))
        setPromotions(data)
        setPage(1)
        setRefresh(false);
      }, function({response}) {
          setRefresh(false); 
      });
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
    clearDate();
    setShowCategories(false);
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
        screenPromotions={true}
        visible={showCategories}
        onRequestClose={onHideCategory}>
      </Categories>
    )
  }

  function renderPromotions() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header
          barStyle="light-content"
          colorIcon={theme.colors.white}
          color={theme.colors.primary}
          onPress={onClickMenu}
        >
          Promoções
        </Header>
        <Block color="white" border center flex={false} padding={[15, 0, 15]}>
          <Button onPress={onClickCategory} style>
            <Text bold color={theme.colors.primary}>
              {name}
            </Text>
          </Button>
        </Block>

        {loading === true && (
          <Block color="white" middle>
            <ActivityIndicator size="small" color="#00000" />
          </Block>
        )}
        {loading === false && (
          <>
            <Block fixed>
              <Button
                onPress={onClickInsert}
                disableRadiusDefault
                radius={theme.sizes.radius * 4}
                color={theme.colors.secondary}
              >
                <Block center row padding={[0, theme.sizes.base * 2]} flex={false}>
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
            <Block color="white">
              {promotions.length === 0 && (
                <Block
                  color="white"
                  center
                  margin={[theme.sizes.padding * 4, 0]}
                >
                  <Block flex={false} padding={theme.sizes.padding}>
                    <SimpleLineIcons
                      name={"handbag"}
                      color={theme.colors.gray3}
                      size={40}
                    />
                  </Block>
                  <Text gray3>Não há promoções no momento.</Text>
                </Block>
              )}

              {promotions.length !== 0 && (
                <FlatList
                  style={styles.flatlist}
                  data={promotions}
                  onRefresh={onRefresh}
                  refreshing={refresh}
                  keyExtractor={(post) => String(post.id)}
                  onEndReached={() => {
                    id != 0
                      ? loadPromotionsByCategory()
                      : loadPromotionsGeneral();
                  }}
                  onEndReachedThreshold={0.1}
                  renderItem={({ item }) => (
                    <PromotionCard item={item} onDetailsClicked={onDetailsClicked}/>
                  )}
                ></FlatList>
              )}
            </Block>
          </>
        )}
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
  flatlist: {
    zIndex: 1
  }
});