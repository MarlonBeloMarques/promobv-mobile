import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Block, Text, Button, Header, Photo } from "../../elements";
import { Insert, Categories } from "../../components";
import { theme } from "../../constants";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import * as SecureStore from "expo-secure-store";

import { } from "./styles";
import { getPromotions, getPromotionsByCategory } from "../../services/promotion";

import { useSelector, useDispatch } from "react-redux";

import no_photo from "../../../assets/images/no-photo.png";
import { getUser } from "../../services/user";
import { checkReports } from "../../services/notification";
import AlertMessage from "../../components/Alert";
import { refreshToken, successfulLogin } from "../../services/auth";
import { signInSuccess } from "../../store/modules/auth/actions";

export default function PromotionScreen(props) {
  const dispatch = useDispatch();

  const { id, name } = useSelector((state) => state.category_promotions, () => true);
  const [promotions, setPromotions] = useState([]);
  const [showInsert, setShowInsert] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [userId, setUserId] = useState(0);

  const [loading, setLoading] = useState(true)

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

          switch (res.status) {
            case 200:
              AlertMessage({
                title: "Atenção",
                message: `${response}`,
              });
              
              break;
          
            default:
              break;
          }
        });
      } catch ({response}) {
        
      }
    }

    async function checkRefreshToken() {
      refreshToken().then((res) => {
        dispatch(signInSuccess(res.headers.authorization, userId))
        successfulLogin(res.headers.authorization)
      }, function({response}) {

      });
    }

    checkReportsPromotions()
    checkRefreshToken()
  }, [])

  useEffect(() => {
    async function loadPromotionsByCategory() {
      await getPromotionsByCategory(id).then((res) => {
        setPromotions(res.data['content'])
      }, function({response}) {

      })
    }

    if(id != 0) {
      loadPromotionsByCategory()
    }
    else {
      loadPromotionsGeneral()
    }
  }, [id])

  async function loadPromotionsGeneral() {
    await getPromotions().then((res) => {
      setPromotions(res.data["content"])
    }, function({response}) {
      
    });

    setLoading(false)
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
        <Header barStyle='light-content' colorIcon={theme.colors.white} color={theme.colors.primary} onPress={onClickMenu}>Promoções</Header>
        <Block border center flex={false} padding={[15, 0, 15]}>
          <Button onPress={onClickCategory} style>
            <Text bold color={theme.colors.primary}>
              {name}
            </Text>
          </Button>
        </Block>

        {loading === true &&
          <Block middle>
            <ActivityIndicator size="small" color='#00000'/>
          </Block>
        }
        {loading === false && 
          <>

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
            {promotions.length === 0 && 
              <Block center margin={[theme.sizes.padding * 4, 0]}>
                <Block flex={false} padding={theme.sizes.padding}>
                  <SimpleLineIcons
                    name={"handbag"}
                    color={theme.colors.gray3}
                    size={40}
                  />
                </Block>
                <Text gray3>Não há promoções no momento.</Text>
              </Block>
            }

            {promotions.length !== 0 && 
              <FlatList
                style={styles.flatlist}
                data={promotions}
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
                    {item.imagem !== null && <Photo height={100} size={40} image={item.imagem} />}
                    {item.imagem === null && <Photo height={100} size={40} image={no_photo} />}
                    <Block padding={[15, 10, 0]}>
                      <Text gray bold size={18}>
                        {item.titulo}
                      </Text>
                      <Block style={styles.end}>
                        <Text secondary size={15} bold>
                          {"R$ "}{item.preco}
                        </Text>
                        <Block padding={[5, 0, 0]} flex={false}>
                          <Text gray3 bold>
                            {item.localizacao}
                          </Text>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                )}
              ></FlatList>
            } 
          </>
        }
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

  end: {
    justifyContent: "flex-end",
    marginBottom: 10
  },

  flatlist: {
    zIndex: 1
  }
});