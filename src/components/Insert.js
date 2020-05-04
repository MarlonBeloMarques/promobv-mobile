import React, { useState, useEffect, useRef } from "react";
import { Modal, StyleSheet, Keyboard, Image } from "react-native";
import { Block, Text, Button, Input, Header } from "../elements";
import { theme } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

import { setPromotion, setPromotionPicture } from "../services/promotion/index";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryUpdateAndInsert } from "../store/modules/category/updateAndInsert/actions";
import { setImagesPromotion } from "../store/modules/images/actions";

import { DrawerActions } from "react-navigation-drawer";
import { DotsLoader } from 'react-native-indicator'

import Categories from './Categories'

import AlertMessage from './Alert'
import Gallery from "./Gallery";
import { getUser } from "../services/user";
import { Ionicons } from "@expo/vector-icons";

export default function Insert(props) {
  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.category_updateAndInsert, () => true);
  const { images } = useSelector((state) => state.images, () => true);

  const[title, setTitle] = useState('')
  const[description, setDescription] = useState('')
  const[localization, setLocalization] = useState('')
  const[address, setAddress] = useState('')
  const[price, setPrice] = useState('')

  const [showCategories, setShowCategories] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const [numberUser, setNumberUser] = useState('')

  const [loader, setLoader] = useState(false)

  const descriptionRef = useRef();
  const localizationRef = useRef();
  const addressRef = useRef();
  const priceRef = useRef();

  const [titleButtonModal, setTitleButtonModal] = useState('Cancelar')
  const [height, setHeight] = useState(theme.sizes.base * 3);

  if(!props.modal) {
    props.navigation.addListener("willBlur", () => {
      dispatch(setImagesPromotion([]));
    });
  }

  useEffect(() => {
    async function loadNumberUser() {
      const email = await SecureStore.getItemAsync('user_email')
  
      getUser(JSON.parse(email)).then((res) => {
        const response = res.data   
        setNumberUser(response.telefone)
      }, function({response}) {
          if (response.status === 403) {
            AlertMessage({
              title: "Atenção",
              message: "Sua sessão expirou.",
            });
            if(props.modal)
              props.onRequestClose()
            else 
              props.navigation.navigate('login')
          }
      })
    }

    loadNumberUser()
  }, [])

  useEffect(() => {
    function checkFields() {
      if(props.modal) {
        if(title !== '' && description !== '' && localization !== '' && address !== '' && price !== '' && images.length !== 0) {
          setTitleButtonModal('Inserir')
        } else {
          setTitleButtonModal('Cancelar');
        }
      }
    }

    checkFields()
  })

  async function submitPicture(photo, promoId) {

    let localUri = photo.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });

    await setPromotionPicture(promoId, formData).then(res => {

    }, function({response}) {

    })

  }

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  function buttonAction(titleModal) {

    let promoId = 0;

    async function handleSubmit() { 

      setLoader(true)
      try {      
        if(props.modal) {
  
          if(titleButtonModal === 'Inserir') {
            await setPromotion(description, price, localization, address, title, id).then(res => {
              let promo = res.headers.location
              let N = res.config.baseURL
              
              promoId = JSON.parse(promo.substring(N.length + 11, promo.length))
            })
  
            for (const img of images) {
              await submitPicture(img, promoId)
            }
            
            AlertMessage({
              title: "Sucesso",
              message: "Sua promoção foi publicada.",
            });
          }
  
          Keyboard.dismiss();

          setLoader(false)
          closeInsert() 
  
        } else {
          if(title !== '' && description !== '' && localization !== '' && address !== '' && price !== '' && images.length !== 0) {
            await setPromotion(description, price, localization, address, title, id).then(res => {
              let promo = res.headers.location;
              let N = res.config.baseURL;
  
              promoId = JSON.parse(promo.substring(N.length + 11, promo.length));
            })
  
            for (const img of images) {
              await submitPicture(img, promoId)
            }
  
            setTitle('')
            setDescription('')
            setLocalization('')
            setAddress('')
            setPrice('')

  
            AlertMessage({
              title: "Sucesso",
              message: "Sua promoção foi publicada.",
            })
  
            Keyboard.dismiss();

            setLoader(false)
            dispatch(setImagesPromotion([]));
  
          } else {
            AlertMessage({
              title: 'Atenção',
              message: 'O formulário contém campos não preenchidos.'
            })

            setLoader(false)
          }
        }
      } catch ({response}) {
        setLoader(false)
      }

    }

    return (
      <Block padding={[theme.sizes.padding, 0]}>
        <Button onPress={handleSubmit} color={theme.colors.primary}>
          {loader && (
            <Block flex={false} center>
              <DotsLoader color={theme.colors.white} size={10} />
            </Block>
          )}
          {!loader &&
            <Text bold center white>
              {titleModal}
            </Text>
          }
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

    function onClickGallery() {
    setShowGallery(true);
    }

    function onHideGallery() {
      setShowGallery(false);
    }

    function renderGallery() {

      if(onClickGallery)
        return (
          <Gallery
            visible={showGallery}
            onRequestClose={onHideGallery}
          ></Gallery>
        ) 
    }
    
    function renderContentPattern(titleModal, activeIcon) {

      function renderButtonGallery() {
        let imgs = [] 

        images.forEach(element => {
          imgs.push(element.uri)
        });

        if(imgs.length === 0) {
          return (
            <Button onPress={onClickGallery} style={styles.plus}>
              <Text h3 gray>
                +5
              </Text>
            </Button>         
          )
        }
        else {
          return (
            <Button onPress={onClickGallery}>
              <Image source={{uri: imgs[0]}} style={styles.imageGallery}/>
            </Button>           
          )
        } 
      }

      function validatesNumber() {
        if(numberUser !== null && numberUser !== '') {
          return (
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
                  next
                  submitEditing={() => descriptionRef.current.focus()}
                />
                <Input
                  box={height}
                  onContentSizeChange={(e) =>
                    setHeight(e.nativeEvent.contentSize.height)
                  }
                  multiline
                  label="Descrição"
                  defaultValue={description}
                  onChangeText={setDescription}
                  reference={descriptionRef}
                  next
                  submitEditing={() => localizationRef.current.focus()}
                />
                <Input
                  label="Local"
                  defaultValue={localization}
                  onChangeText={setLocalization}
                  reference={localizationRef}
                  next
                  submitEditing={() => addressRef.current.focus()}
                />
                <Input
                  label="Endereço"
                  defaultValue={address}
                  onChangeText={setAddress}
                  reference={addressRef}
                  next
                  submitEditing={() => priceRef.current.focus()}
                />

                <Block row>
                  <Block padding={[0, theme.sizes.padding, 0, 0]}>
                    <Input
                      number
                      label="Valor"
                      defaultValue={price}
                      onChangeText={setPrice}
                      reference={priceRef}
                      done
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
                      <Text gray>{name}</Text>
                    </Button>
                  </Block>
                </Block>
              </Block>

              <Block row>
                <Block flex={false}>
                  <Text bold gray>
                    Galeria
                  </Text>
                  {renderButtonGallery()}
                </Block>
              </Block>

              {buttonAction(titleModal)}
            </Block>
          );     
        } else {
          return (
            <Block
              margin={[
                theme.sizes.padding * 4,
                theme.sizes.padding,
                0,
                theme.sizes.padding,
              ]}
            >
              <Block padding={theme.sizes.padding} center>
                <Ionicons
                  name={"ios-rocket"}
                  color={theme.colors.gray3}
                  size={40}
                />
              </Block>
              <Text center gray3>
                Seus dados cadastrais estão incompletos. Navegue até a barra de
                menu, em{" "}
                <Text bold gray3>
                  Minha Conta
                </Text>{" "}
                e Atualize seu número telefônico.
              </Text>
              <Block margin={[theme.sizes.padding, 0]}>
                {props.modal && (
                  <Button onPress={closeInsert} color={theme.colors.primary}>
                    <Text center bold white>
                      Voltar
                    </Text>
                  </Button>
                )}
              </Block>
            </Block>
          );
        }
      }

      return (
        <>
            {renderGallery()}
            <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
              {header(activeIcon)}
              {validatesNumber()}
            </ScrollView>
        </>
      );
    }

    if (showCategories) {
      return renderCategories();
    }
    return renderContentPattern(titleModal, activeIcon);
    
  }

  function closeInsert() {
    dispatch(setCategoryUpdateAndInsert(1, "Auto e Peças"));
    dispatch(setImagesPromotion([]));
    props.onRequestClose()
  }

  function onModal(titleModal) {
    return (
      <Modal
        visible={props.visible}
        animationType="slide"
        onRequestClose={closeInsert}>
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

  imageGallery: {
    width: 60,
    height: 60,
    borderRadius: theme.sizes.radius,
    padding: 20,
    marginTop: 10,
    marginHorizontal: 10,
  },
});
