import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Block, Text, Button, Input } from "../../elements";
import { theme } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

import { getPromotion, updatePromotion } from "../../services/promotion";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryUpdateAndInsert } from "../../store/modules/category/updateAndInsert/actions";

import { Categories, Gallery, ModalLoader } from "../../components";
import AlertMessage from "../../components/Alert";
import { DotIndicator } from 'react-native-indicators'
import { logout } from "../../services/auth";

export default function Edit(props) {
  const idNavigation = props.navigation.getParam("id");

  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.category_updateAndInsert, () => true); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [numberContact, setNumberContact] = useState("");
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState('');

  const [showCategories, setShowCategories] = useState(false);

  const [imageGallery, setImageGallery] = useState([]);
  const [showGallery, setShowGallery] = useState(false);

  const [loading, setLoading] = useState(true)
  const [loader, setLoader] = useState(false)

  props.navigation.addListener("willBlur", () => {
    dispatch(setCategoryUpdateAndInsert(1, "Auto e Peças"));
  });

  useEffect(() => {
    async function loadPromotion() {
      await getPromotion(idNavigation).then(
        (res) => {
          const response = res.data;

          setTitle(response.titulo);
          setDescription(response.descricao);
          setPlace(response.localizacao);
          setAddress(response.endereco);
          setNumberContact(response.numeroContato)
          setPrice(response.preco.toString());

          setCategoryId(response.categoria.id);
          setCategoryName(response.categoria.nome);

          setImageGallery(response.galeriaDeImagens.urlImagens);
        },
        function ({ response }) {
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
    }

    loadPromotion()
  }, []);

  useEffect(() => {
    setCategoryId(id)
    setCategoryName(name)
  }, [name])

  async function handleSubmit() {
    try {
      setLoader(true)

      await updatePromotion(idNavigation, description, price, place, address, title, numberContact, categoryId)

      AlertMessage({
        title: 'Sucesso',
        message: 'Sua promoção foi atualizada com sucesso.'
      })

      setLoader(false)

      props.navigation.navigate("MinhasPromocoes");

    } catch ({ response }) {
      setLoader(false)
    }
  }

  function onClickCategory() {
    setShowCategories(true);
  }

  function onHideCategory() {
    setShowCategories(false);
  }

  function onClickGallery() {
    setShowGallery(true);
  }

  function onHideGallery() {
    setShowGallery(false);
  }

  function splitPrice(value) {
    const newPrice = value.split("R$").join("").split(",").join(".");
    setPrice(newPrice);
  }

  function renderGallery() {
    if (onClickGallery)
      return (
        <Gallery
          showDetails={true}
          idGallery={idNavigation}
          visible={showGallery}
          onRequestClose={onHideGallery}
        ></Gallery>
      );
  }

  function renderCategories() {
    return (
      <Categories
        visible={showCategories}
        onRequestClose={onHideCategory}
      ></Categories>
    );
  }

  function renderEdit() { 

    return (
      <>
        {loading && <ModalLoader loading={loading} />}
        {renderGallery()}
        <ScrollView
          backgroundColor="white"
          showsVerticalScrollIndicator={false}
        >
          <Block
            padding={[0, theme.sizes.padding]}
            space="between"
            color={theme.colors.white}
          >
            <Block margin={[theme.sizes.header, 0]} flex={false}>
              <Input
                label="Titulo"
                defaultValue={title}
                onChangeText={setTitle}
              />
              <Input
                label="Descrição"
                defaultValue={description}
                onChangeText={setDescription}
              />
              <Input
                label="Local"
                defaultValue={place}
                onChangeText={setPlace}
              />
              <Input
                label="Endereço"
                defaultValue={address}
                onChangeText={setAddress}
              />
              <Input
                label="Número de Contato"
                mask={true}
                type={"cel-phone"}
                number
                price={numberContact}
                defaultValue={numberContact}
                onChangeText={setNumberContact}
              />

              <Block row>
                <Block padding={[0, theme.sizes.padding, 0, 0]}>
                  <Input
                    mask={true}
                    type={'money'}
                    label="Valor"
                    number
                    value={price}
                    defaultValue={price}
                    onChangeText={(value) => splitPrice(value)}
                  />
                </Block>

                <Block margin={[theme.sizes.base / 1.5, 0]}>
                  <Block
                    padding={[0, 0, theme.sizes.base - 10, 4]}
                    flex={false}
                  >
                    <Text gray>Categoria</Text>
                  </Block>
                  <Button onPress={onClickCategory} style={styles.button}>
                    <Text gray>{categoryName}</Text>
                  </Button>
                </Block>
              </Block>
            </Block>

            <Block row>
              <Block flex={false}>
                <Text bold gray>
                  Galeria
                </Text>
                <Button onPress={onClickGallery} style={styles.plus}>
                  <Text h3 gray>
                    +5
                  </Text>
                </Button>
              </Block>
            </Block>

            <Block middle padding={[theme.sizes.padding / 2, 0]}>
              <Button onPress={handleSubmit} color={theme.colors.primary}>
                {loader ? (
                  <Block flex={false} center>
                    <DotIndicator color={theme.colors.white} size={5} />
                  </Block>
                ) : (
                  <Text bold center white>
                    Atualizar
                  </Text>
                )}
              </Button>
            </Block>
          </Block>
        </ScrollView>
      </>
    );
  }

  if (showCategories) {
    return renderCategories()
  }
  return renderEdit()
  
}

const styles = StyleSheet.create({
  plus: {
    backgroundColor: theme.colors.gray2,
    padding: 20,
    borderRadius: theme.sizes.radius,
    marginHorizontal: 10,
    marginTop: 10,
  },

  button: {
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    paddingLeft: theme.sizes.base - 6,
  },
});
