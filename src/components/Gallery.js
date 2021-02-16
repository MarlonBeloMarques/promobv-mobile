import React, {useState, useEffect} from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Block, Button, Text } from "../elements";
import { theme } from "../constants";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import AlertMessage from "./Alert";
import Lightbox from "react-native-lightbox";

import { useDispatch } from "react-redux";

import { setImagesPromotion } from '../store/modules/images/actions'
import { ScrollView } from "react-native-gesture-handler";
import { getPromotion } from "../services/promotion";

const { height } = Dimensions.get("window");

const Gallery = (props) => {
  const { idGallery, showDetails } = props

  const [image, setImage] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadGallery() {
      getPromotion(idGallery).then(res => {
        const response = res.data

        setImage(response.galeriaDeImagens.urlImagens)
      }, function({response}) {
        
      })
    }

    loadGallery()
  }, [idGallery])

  async function addImage() {
    if(image.length <= 4) {
      let result = await ImagePicker.launchImageLibraryAsync({
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.cancelled) {
        setImage([...image, result]);
      }
    } else {
      AlertMessage({
        title: 'Atenção',
        message: 'A galeria permite no máximo 6 imagens.'
      })
    }
  }

  function renderImages() {
    
    let images = [];

    if(showDetails === true) {
      image.map((item, index) => {
        images.push(
          <Block key={index} flex={false} margin={5}>
            <Lightbox >
              <Image
                resizeMode='cover'      
                source={{uri: item}}
                style={{ minWidth: 160, height: 200, borderRadius: theme.sizes.radius }}
              />
            </Lightbox>
          </Block>
        )
      })

      dispatch(setImagesPromotion([]));

    } else {
        image.map((item, index) => {
          images.push(
            <Block key={index} flex={false} margin={5}>
              <Lightbox >
                <Image
                  resizeMode='cover'      
                  source={{uri: item.uri}}
                  style={{ minWidth: 160, height: 200, borderRadius: theme.sizes.radius }}
                />
              </Lightbox>
            </Block>
          )
        })

        dispatch(setImagesPromotion(image));
    }

    return images
  }

  function showAddIcon() {
    
      if(!showDetails) {
        return (
          <Button onPress={addImage} style>
            <Block flex={false} margin={[0, theme.sizes.base, 0, 0]}>
              <MaterialIcons
                name={"add-a-photo"}
                size={20}
                color={theme.colors.gray}
              />
            </Block>
          </Button>
        );
    }
  }

  return (
    <Modal
      onBackdropPress={props.onRequestClose}
      isVisible={props.visible}
      swipeDirection={["down"]}
      onSwipeComplete={props.onRequestClose}
      onRequestClose={props.onRequestClose}
      style={{margin: 0, marginTop: height / 9}}
    >
      <Block 
        style={{ 
          borderTopStartRadius : theme.sizes.radius * 2, 
          borderTopEndRadius : theme.sizes.radius * 2}} 
        color={theme.colors.white} 
        padding={[ Platform.OS === 'ios' ? 20 : 10]}>
        <Block flex={false} row padding={[theme.sizes.base, theme.sizes.base]}>
          {showAddIcon()}
          <Text h3 bold gray>
            Galeria
          </Text>
        </Block>
        {image.length === 0 && 
          <Block center middle margin={theme.sizes.base}>
            <Block flex={false} padding={theme.sizes.padding}>
              <AntDesign name={'picture'} size={50} color={theme.colors.gray3} />
            </Block>
            <Text bold gray3 center>Para inserir imagens na sua galeria, pressione o botão
              {' '}<MaterialIcons name={"add-a-photo"} size={12} color={theme.colors.gray3} />{' '}
              acima.
            </Text>
          </Block>
        }
        {image.length !== 0 && 
          <>
            <ScrollView>
              <Block center style={styles.gallery} margin={theme.sizes.base}>
                {renderImages()}
              </Block>
            </ScrollView>
            <Block flex={false} margin={[theme.sizes.caption, 0]}>
              <Text bottom center gray3>Clique na imagem para visualizar em tela cheia.</Text>
            </Block>
          </>
        }
      </Block>
    </Modal>
  );
};

Gallery.propTypes = {
  onRequestClose: () => {}
};

export default Gallery;

export const styles = StyleSheet.create({
  gallery: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
})