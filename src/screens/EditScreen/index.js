import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Block, Text, Button, Input } from "../../elements";
import { theme } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

import { getPromotion, updatePromotion } from "../../services/promotion";

import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../store/modules/category/actions";

import { Categories } from "../../components";

export default function Edit(props) {
  const idNavigation = props.navigation.getParam("id");

  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.category, () => true);
 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState('');

  const [showCategories, setShowCategories] = useState(false);

  props.navigation.addListener("willBlur", () => {
    dispatch(setCategory(0, "Geral"));
  });

  useEffect(() => {
    async function loadPromotion() {
      await getPromotion(idNavigation).then(res => {
        const response = res.data

        setTitle(response.titulo)
        setDescription(response.descricao)
        setPlace(response.localizacao)
        setAddress(response.endereco)
        setValue(response.preco.toString())

        setCategoryId(response.categoria.id)
        setCategoryName(response.categoria.nome)
      })
    }

    loadPromotion()
  }, []);

  useEffect(() => {
      setCategoryId(id)
      setCategoryName(name)
  }, [id])

  function handleSubmit() {
    updatePromotion(idNavigation, description, value, place, address, title, categoryId)
  }

  function onClickCategory() {
    setShowCategories(true);
  }

  function onHideCategory() {
    setShowCategories(false);
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
      <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
        <Block
          padding={[0, theme.sizes.padding]}
          space="between"
          color={theme.colors.white}
        >
          <Block margin={[theme.sizes.header, 0]} flex={false}>
            <Input 
              label="Titulo" 
              defaultValue={title} 
              onChangeText={setTitle}/>
            <Input
              label="Descrição"
              defaultValue={description}
              onChangeText={setDescription}
            />
            <Input 
              label="Local" 
              defaultValue={place}
              onChangeText={setPlace}/>
            <Input
              label="Endereço"
              defaultValue={address}
              onChangeText={setAddress}
            />

            <Block row>
              <Block padding={[0, theme.sizes.padding, 0, 0]}>
                <Input
                  label="Valor"
                  defaultValue={value}
                  onChangeText={setValue}
                />
              </Block>

              <Block margin={[theme.sizes.base / 1.5, 0]}>
                <Block padding={[0,0, theme.sizes.base - 10, 4]} flex={false}>
                  <Text gray>
                    Categoria
                  </Text>
                </Block>
                <Button onPress={onClickCategory} style={styles.button}>
                  <Text gray>
                    {categoryName}
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>

          <Block row>
            <Block flex={false}>
              <Text bold gray>
                Galeria
              </Text>
              <Button style={styles.plus}>
                <Text h3 gray>
                  +5
                </Text>
              </Button>
            </Block>
          </Block>

          <Block middle padding={[theme.sizes.padding / 2, 0]}>
            <Button onPress={handleSubmit} color={theme.colors.primary}>
              <Text bold center white>
                Atualizar
              </Text>
            </Button>
          </Block>
        </Block>
      </ScrollView>
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
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    paddingLeft: theme.sizes.base -6
  },
});
