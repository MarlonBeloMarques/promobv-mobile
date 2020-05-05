import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StatusBar, Share } from "react-native";
import { Block, Button, Text, Photo } from "../../elements";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants";
import * as SecureStore from "expo-secure-store";
import { Linking } from "expo";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { getPromotion } from '../../services/promotion'

import profile from "../../../assets/images/profile-image.png";

import no_photo from "../../../assets/images/no-photo.png";
import { Gallery, ModalLoader } from "../../components";
import { interactNotification } from "../../services/notification";
import { FormatCurrentDate, EncryptedLinking, DecryptedLinking } from "../../utils";
import { getUser } from "../../services/user";
import { useSelector } from "react-redux";
import AlertMessage from "../../components/Alert";

export default function DetailsScreen(props) {
  const id = props.navigation.getParam('id')
  const [idLinking, setIdLinking] = useState(0)
  const { idUser } = useSelector((state) => state.auth, () => true)
  
  const [idUserProfile, setidUserProfile] = useState(0)
  const [details, setDetails] = useState({
    name: '',
    avatar: '',
    title: '',
    image: '',
    description: '',
    price: '',
    localization: '',
    address: '',
    number: ''
  })

  const [notifications, setNotifications] = useState([])
  const [userName, setUserName] = useState('')
  const [userOtherName, setOtherUserName] = useState('')
  const [amountNotifications, setAmountNotifications] = useState(0)

  const [imageGallery, setImageGallery] = useState([])
  const [showGallery, setShowGallery] = useState(false);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDetails(id) {
      await getPromotion(id).then(res => {
        const response = res.data

        console.log(response)

        setDetails({ name: response.apelidoUsuario,
                     title: response.titulo,
                     avatar : response.userUrlProfile,
                     image: response.imagem,
                     description: response.descricao,
                     price: response.preco,
                     localization: response.localizacao,
                     address: response.endereco,
                     number: response.userTelefone,
                     numberContact: response.numeroContato })

        setImageGallery(response.galeriaDeImagens.urlImagens)
        setNotifications(response.notificacoes)
      }, function({response}) {
        
      })

      setLoading(false)
    }

    async function loadLinking() {
      if (id == null) {
        const id = DecryptedLinking(props.navigation.getParam("promotionId"))
        setIdLinking(id)
        loadDetails(id)
      }
    }

    loadDetails(id)
    loadProfile();
    loadLinking();
  
    props.navigation.setParams({ onClickDenounce: onClickDenounce });
  }, []);

  useEffect (() => {
    getUserNotification();
  }, [notifications])

  async function onClickDenounce() {
    await interactNotification(FormatCurrentDate(), new Date().toLocaleTimeString(), 2, idUser, id).then(res => {
      let response = res.data

      if(res.status === 202) {
        AlertMessage({
          title: 'Atenção',
          message: `${response.message}`
        })
      }

      if(res.status === 201) {
        AlertMessage({
          title: 'Atenção',
          message: 'Você denunciou essa promoção.'
        })
      }
    })
  }

  function sharePromotion() {
    let idLink = EncryptedLinking(id == null ? idLinking : id)
    Share.share({
      message: "Clique no link para visualizar a promoção, " + Linking.makeUrl(`/details/${idLink}`),
      url: Linking.makeUrl(),
      title: details.title,
    })
      .then((result) => {
        console.log(result);
        if (result === "dismissedAction") {
          return;
        }
      })
      .catch((error) => console.log(error));
  }

  async function loadProfile() {
    const email = await SecureStore.getItemAsync('user_email')

    await getUser(JSON.parse(email)).then(res => {
      const response = res.data;

      setidUserProfile(JSON.parse(response.id))
    })
  }

  async function onClickInteractNotification() {
    await interactNotification(FormatCurrentDate(), new Date().toLocaleTimeString(), 1, idUserProfile, id).then(res => {

      if(res.status === 202) {
        setUserName('')
      }
    })

    await getPromotion(id).then(res => {
      const response = res.data
      setNotifications(response.notificacoes)
    })
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
            showDetails={true}
            idGallery={id}
            visible={showGallery}
            onRequestClose={onHideGallery}
          ></Gallery>
        )
  }

  async function getUserNotification() {
    let email = await SecureStore.getItemAsync("user_email");

    setAmountNotifications(notifications.length)

    notifications.forEach((notific) => {
      if(JSON.stringify(notific.usuario.email) === email) {
        setUserName(notific.usuario.apelido)
      }
    })

    if(userName === '' && notifications.length > 0) {
      let notific = notifications[0]
      setOtherUserName(notific.usuario.apelido)
    }
  }

  function showIcon() {

    if(userName !== '') {
      return <Ionicons
         name={"ios-heart"}
         size={30}
         color={theme.colors.accent}
        />
    } else {
      return <Ionicons
          name={"ios-heart"}
          size={30}
          color={theme.colors.gray3}
        />
    }
  }

  function showNotifications() {

    if(userName === '' && amountNotifications > 1) {
      return `${userOtherName} ...${amountNotifications - 1}`
    }
    else if(userName === '' && amountNotifications === 1) {
      return userOtherName
    }
    else if(userName !== '' && amountNotifications > 1) {
      return `${userName} ...${amountNotifications - 1}`;
    }
    else if(userName !== '' && amountNotifications === 1) {
      return userName
    }
  }

  return (
    <>
    {loading && <ModalLoader loading={loading} />}
    {renderGallery()}
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          padding={theme.sizes.header}
          size={theme.sizes.base * 5}
          flex={false}
          row
        >
          {details.avatar === null && <Photo avatar image={profile} />}
          {details.avatar !== null && <Photo avatar image={details.avatar} />}
          <Block padding={[10, 10, 10, 20]}>
            <Text bold size={theme.sizes.header} color={theme.colors.gray}>
              {details.name}
            </Text>
          </Block>
        </Block>
        <Block size={300} flex={false}>
          {details.image === null && <Photo height={100} size={100} image={no_photo} />}
          {details.image !== null && <Photo height={100} size={100} image={details.image} />}
        </Block>
        <Block>
          <Block border padding={[10, 50]} flex={false} row>
            <Block row flex={false}>
              <Button onPress={onClickInteractNotification} style>
                {showIcon()}
              </Button>
              <Block padding={[0, theme.sizes.base]} middle flex={false}>
                <Text gray3>
                  {showNotifications()}
                </Text>
              </Block>
            </Block>
            <Block row right>
              <Button onPress={sharePromotion} style>
                <Ionicons
                  name={"ios-share"}
                  size={30}
                  color={theme.colors.gray3}
                />
              </Button>
            </Block>
          </Block>
          <Block padding={[10, 40]}>
            <Text center bold h2 color={theme.colors.gray}>
              {details.title}
            </Text>
            <Block flex={false} margin={[12, 0]}>
              <Text light color={theme.colors.gray}>
                {details.description}
              </Text>
            </Block>
            <Block padding={[20, 0, 10, 0]} flex={false} border>
              <Text h3 bold color={theme.colors.secondary}>
                {"R$ "}
                {details.price}
              </Text>
            </Block>
            <Block flex={false} border>
              <Block flex={false} row>
                <Block flex={false} center column>
                  <Block padding={5}>
                    <Ionicons
                      name={"ios-locate"}
                      size={20}
                      color={theme.colors.gray3}
                    />
                  </Block>
                  {details.numberContact !== '' && details.numberContact !== null &&
                    <Block padding={5}>
                      <Ionicons
                        name={"ios-phone-portrait"}
                        size={20}
                        color={theme.colors.gray3}
                      />
                    </Block>
                  }
                </Block>
                <Block>
                  <Block margin={5} padding={[2, 0]}>
                    <Text>
                      {details.localization}
                      {", "}
                      {details.address}
                    </Text>
                  </Block>
                  {details.numberContact !== '' && details.numberContact !== null &&
                    <Block margin={5} padding={[2, 0]}>
                      <Text>{details.numberContact}</Text>
                    </Block>
                  }
                </Block>
              </Block>
            </Block>
            <Block margin={[8, 0, 0, 0]} size={200}>
              <Text bold h3 gray>
                Galeria
              </Text>

              <Block padding={[15]} row flex={false}>
                <Block padding={[0, 10, 0, 0]} flex={false}>
                  {imageGallery[0] == null &&
                  <Photo
                    content={true}
                    size={80}
                    height={80}
                    card
                    image={no_photo}
                  />}
                  {imageGallery[0] !== null &&
                  <Photo
                    content={true}
                    size={80}
                    height={80}
                    card
                    image={imageGallery[0]}
                  />}
                </Block>
                <Block flex={false}>
                  {imageGallery[1] == null &&
                  <Photo
                    content={true}
                    size={80}
                    height={80}
                    card
                    image={no_photo}
                  />}
                  {imageGallery[1] !== null &&
                  <Photo
                    content={true}
                    size={80}
                    height={80}
                    card
                    image={imageGallery[1]}
                  />}
                </Block>
                <Block flex={false}>
                  <Button onPress={onClickGallery} style={styles.plus}>
                    <Text h3 gray>
                      +
                    </Text>
                  </Button>
                </Block>
              </Block>

            </Block>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
  );
}
