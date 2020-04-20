import React, { useState, useEffect } from "react";
import { Modal, StyleSheet } from "react-native";
import { Block, Text, Button, Input, Header } from "../elements";
import { theme } from "../constants";
import { ScrollView } from "react-native-gesture-handler";

import { setPromotion } from "../services/promotion/index";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryUpdateAndInsert } from "../store/modules/category/updateAndInsert/actions";

import { DrawerActions } from "react-navigation-drawer";

import Categories from './Categories'

import AlertMessage from './Alert'

export default function Insert(props) {
  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.category_updateAndInsert, () => true);

  const[title, setTitle] = useState('')
  const[description, setDescription] = useState('')
  const[localization, setLocalization] = useState('')
  const[address, setAddress] = useState('')
  const[price, setPrice] = useState('')

  const [showCategories, setShowCategories] = useState(false);

  const [titleButtonModal, setTitleButtonModal] = useState('Cancelar')

  useEffect(() => {
    function checkFields() {
      if(props.modal) {
        if(title !== '' && description !== '' && localization !== '' && address !== '' && price !== '') {
          setTitleButtonModal('Inserir')
        } else {
          setTitleButtonModal('Cancelar');
        }
      }
    }

    checkFields()
  })


  useEffect(() => {
    return () => {
      dispatch(setCategoryUpdateAndInsert(1, "Auto e Peças"));
    };
  })

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  function buttonAction(titleModal) {

    function handleSubmit() { 
      if(props.modal) {
        if(titleButtonModal === 'Inserir')
          setPromotion(description, price, localization, address, title, id)  
        props.onRequestClose();             
      } else {
        if(title !== '' && description !== '' && localization !== '' && address !== '' && price !== '') {
          setPromotion(description, price, localization, address, title, id);
        } else {
          AlertMessage({
            title: 'Atenção',
            message: 'O formulário contém campos não preenchidos.'
          })
        }
      }
    }

    return (
      <Block padding={[theme.sizes.padding, 0]}>
        <Button onPress={handleSubmit} color={theme.colors.primary}>
          <Text bold center white>
            {titleModal}
          </Text>
        </Button>
      </Block>
    );
  }

  function header(activeIcon) {
    if(activeIcon) {
       return (
         <Header barStyle='dark-content' colorIcon={theme.colors.gray} onPress={onClickMenu} color={theme.colors.white}>
          <Text gray>Inserir</Text>
        </Header>
       )
    } else {
        return (
          <Header barStyle='dark-content' colorIcon={theme.colors.white} color={theme.colors.white}>
            <Text gray>Inserir</Text>
          </Header>
        );
    }
      
  }

  function contentPattern(titleModal, activeIcon) {

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
    
    function renderContentPattern(titleModal, activeIcon) {

      return (
        <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
          {header(activeIcon)}
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
                defaultValue={localization} 
                onChangeText={setLocalization}/>
              <Input
                label="Endereço"
                defaultValue={address}
                onChangeText={setAddress}
              />

              <Block row>
                <Block padding={[0, theme.sizes.padding, 0, 0]}>
                  <Input
                    label="Valor"
                    defaultValue={price}
                    onChangeText={setPrice}
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
                      {name}
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

            {buttonAction(titleModal)}
          </Block>
        </ScrollView>
      );
    }

    if (showCategories) {
      return renderCategories();
    }
    return renderContentPattern(titleModal, activeIcon);
    
  }

  function onModal(titleModal) {
    return (
      <Modal
        visible={props.visible}
        animationType="slide"
        onRequestClose={props.onRequestClose}>
        {contentPattern(titleModal)}
      </Modal>
    )
  }

  if (props.modal) {
    return onModal(titleButtonModal);
  } 
  else {
    return (
      contentPattern('Inserir', true)
    )
  }

};

Insert.propTypes = {
  visible: false,
  modal: false,
  onRequestClose: () => {}
};

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
  profile: {
    width: 50,
    height: 50,
  },
});
