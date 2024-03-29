import React, { useState, useEffect, useRef } from "react";
import { Modal, StyleSheet, Keyboard, Image } from "react-native";
import { Block, Text, Button, Input } from "../elements";
import  Header from './Header'
import { theme } from "../constants";
import { ScrollView } from "react-native-gesture-handler";

import { setPromotion, setPromotionPicture } from "../services/promotion/index";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryUpdateAndInsert } from "../store/modules/category/updateAndInsert/actions";
import { setImagesPromotion } from "../store/modules/images/actions";

import { DrawerActions } from "react-navigation-drawer";
import { DotIndicator } from 'react-native-indicators'

import Categories from './Categories'

import AlertMessage from './Alert'
import Gallery from "./Gallery";

export default function Insert(props) {
  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.category_updateAndInsert, () => true);
  const { images } = useSelector((state) => state.images, () => true);

  const[title, setTitle] = useState('')
  const[description, setDescription] = useState('')
  const[localization, setLocalization] = useState('')
  const[address, setAddress] = useState('')
  const[numberContact, setNumberContact] = useState('')
  const[price, setPrice] = useState('')

  const [showCategories, setShowCategories] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const [loader, setLoader] = useState(false)

  const descriptionRef = useRef();
  const localizationRef = useRef();
  const addressRef = useRef();
  const priceRef = useRef();
  const numberContactRef = useRef();

  const [titleButtonModal, setTitleButtonModal] = useState('Cancelar')
  const [height, setHeight] = useState(theme.sizes.base * 3);

  const [errors, setErrors] = useState([]);

  const errorStyle = (key) => {
    return errors.includes(key) ? true : false;
  };

  const checkErrors = (value) => {
    errors.forEach((error, index) => {
      if (error === value) {
        errors.splice(index, 1);
      }
    });
  };

  useEffect(() => {
    if (title !== "") checkErrors("title");
    if (description !== "") checkErrors("description");
    if (localization !== "") checkErrors("localization");
    if (address !== "") checkErrors("address");
    if (numberContact !== "") checkErrors("numberContact");
    if (price !== "") checkErrors("price");
  }, [title, description, localization, address, numberContact, price]);


  if(!props.modal) {
    props.navigation.addListener("willBlur", () => {
      dispatch(setImagesPromotion([]));
    });
  }

  useEffect(() => {
    function checkFieldsForModal() {
      if(props.modal) {
        if(title !== '' && 
          description !== '' && 
          localization !== '' && 
          address !== '' && 
          price !== '' && 
          numberContact !== '' && 
          images.length !== 0) {
          setTitleButtonModal('Inserir')
        } else {
          setTitleButtonModal('Cancelar');
        }
      }
    }

    checkFieldsForModal()
  })

  async function submitPicture(photo, promoId) {

    let localUri = photo.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });

    await setPromotionPicture(promoId, formData).then(res => {

    }, function({response}) {})

  }

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.openDrawer());
  }

  function buttonAction(titleModal) {

    let promoId = 0;

    async function handleSubmit() { 

      if(title === '') setErrors((prevErrors) => [...prevErrors, "title"]);
      if(description === '') setErrors((prevErrors) => [...prevErrors, "description"]);
      if(localization === '') setErrors((prevErrors) => [...prevErrors, "localization"]);
      if(address === "") setErrors((prevErrors) => [...prevErrors, "address"]);
      if(price === "") setErrors((prevErrors) => [...prevErrors, "price"]);
      if(numberContact === '') setErrors((prevErrors) => [...prevErrors, "numberContact"]);

      setLoader(true);
      try {   
        if(props.modal) {
          addFromModal();
        } else {
          addFromScreen();
        }
      } catch ({response}) {
        setLoader(false)
      }

    }

    async function addFromModal() {
      if(titleButtonModal === 'Inserir') {
        await setPromotion(description, price, localization, address, title, numberContact, id).then(res => {
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
    }

    async function addFromScreen() {
      if(title !== '' && 
        description !== '' && 
        localization !== '' && 
        address !== '' && 
        price !== '' && 
        numberContact !== '' && 
        images.length !== 0) 
      {
        await setPromotion(description, price, localization, address, title, numberContact, id).then(res => {
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
        setNumberContact('')

        AlertMessage({
          title: "Sucesso",
          message: "Sua promoção foi publicada.",
        })
        Keyboard.dismiss();
        setLoader(false)
        dispatch(setImagesPromotion([]));
  
      } else {
        setLoader(false)
      }
    }

    return (
      <Block padding={[theme.sizes.padding, 0]}>
        <Button onPress={handleSubmit} color={theme.colors.primary}>
          {loader && (
            <Block flex={false} center>
              <DotIndicator color={theme.colors.white} size={5} />
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
          <Text h3 bold gray>Inserir</Text>
        </Header>
       )
    } else {
        return (
          <Header barStyle='dark-content' colorIcon={theme.colors.white} color={theme.colors.white}>
            <Text h3 bold gray>Inserir</Text>
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

      function splitPrice(value) {
        const newPrice = value.split('R$').join('').split(',').join('.');
        setPrice(newPrice);
      }

      return (
        <>
          {renderGallery()}
          <ScrollView
            backgroundColor="white"
            showsVerticalScrollIndicator={false}
          >
            {header(activeIcon)}
            <Block
              padding={[0, theme.sizes.padding]}
              space="between"
              color={theme.colors.white}
            >
              <Block margin={[theme.sizes.header, 0]} flex={false}>
                <Input
                  label={errorStyle("title") ? "Titulo incorreto" : "Titulo"}
                  error={errorStyle("title")}
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
                  label={
                    errorStyle("description")
                      ? "Descrição incorreta"
                      : "Descrição"
                  }
                  error={errorStyle("description")}
                  defaultValue={description}
                  onChangeText={setDescription}
                  reference={descriptionRef}
                  next
                  submitEditing={() => localizationRef.current.focus()}
                />
                <Input
                  label={
                    errorStyle("localization")
                      ? "Localização incorreta"
                      : "Localização"
                  }
                  error={errorStyle("localization")}
                  defaultValue={localization}
                  onChangeText={setLocalization}
                  reference={localizationRef}
                  next
                  submitEditing={() => numberContactRef.current.focus()}
                />
                <Input
                  label={
                    errorStyle("numberContact")
                      ? "Número de contato incorreto"
                      : "Número de contato"
                  }
                  error={errorStyle("numberContact")}
                  mask={true}
                  type={"cel-phone"}
                  number
                  value={numberContact}
                  defaultValue={numberContact}
                  onChangeText={setNumberContact}
                  reference={numberContactRef}
                  next
                  submitEditing={() => addressRef.current.focus()}
                />
                <Input
                  label={
                    errorStyle("address") ? "Endereço incorreto" : "Endereço"
                  }
                  error={errorStyle("address")}
                  defaultValue={address}
                  onChangeText={setAddress}
                  reference={addressRef}
                  next
                  submitEditing={() => priceRef.current.focus()}
                />

                <Block row>
                  <Block padding={[0, theme.sizes.padding, 0, 0]}>
                    <Input
                      mask={true}
                      type={"money"}
                      number
                      label={errorStyle("price") ? "Preço incorreto" : "Preço"}
                      error={errorStyle("price")}
                      value={price}
                      defaultValue={price}
                      onChangeText={(value) => splitPrice(value)}
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
  
  return (
    contentPattern('Inserir', true)
  )

};

Insert.defaultProps = {
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
