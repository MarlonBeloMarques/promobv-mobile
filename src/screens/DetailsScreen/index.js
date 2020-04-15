import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, StatusBar } from "react-native";
import { Block, Input, Button, Text, Photo } from "../../elements";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { getPromotion } from '../../services/promotion'

import profile from "../../../assets/images/profile-image.png";

export default function DetailsScreen(props) {
  const id = props.navigation.getParam('id')

  const [details, setDetails] = useState({
    name: '',
    avatar: '',
    title: '',
    image: '',
    description: '',
    price: '',
    localization: '',
    number: ''
  })

  useEffect(() => {
    async function loadDetails() {
      getPromotion(id).then(res => {
        const response = res.data
        setDetails({ name: response.nomeUsuario,
                     title: response.titulo,
                     avatar : '',
                     image: response.imagem,
                     description: response.descricao,
                     price: response.preco,
                     localization: response.localizacao,
                     number: '' })
      })
    }

    loadDetails()
  }, []);

  console.log(details)

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          padding={theme.sizes.header}
          size={theme.sizes.base * 5}
          flex={false}
          row
        >
          {details.avatar === "" && <Photo avatar image={profile} />}
          {details.avatar !== "" && <Photo avatar image={details.image} />}
          <Block padding={[10, 10, 10, 20]}>
            <Text bold size={theme.sizes.header} color={theme.colors.gray}>
              {details.name}
            </Text>
          </Block>
        </Block>
        <Block size={300} flex={false}>
          <Photo height={100} size={100} image={details.image} />
        </Block>
        <Block>
          <Block border padding={[10, 50]} flex={false} row>
            <Button style>
              <Ionicons
                name={"ios-heart"}
                size={30}
                color={theme.colors.gray3}
              />
            </Button>
            <Block row right>
              <Button style>
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
                  <Block padding={5}>
                    <Ionicons
                      name={"ios-phone-portrait"}
                      size={20}
                      color={theme.colors.gray3}
                    />
                  </Block>
                </Block>
                <Block>
                  <Block margin={5} padding={[2, 0]}>
                    <Text>{details.localization}</Text>
                  </Block>
                  <Block margin={5} padding={[2, 0]}>
                    <Text>{details.number}</Text>
                  </Block>
                </Block>
              </Block>
            </Block>
            <Block margin={[8, 0, 0, 0]} size={200}>
              <Text bold h3 gray>
                Galeria
              </Text>
              <Block padding={[15]} row flex={false}>
                <Block padding={[0, 10, 0, 0]} flex={false}>
                  <Photo
                    content={true}
                    size={80}
                    height={80}
                    card
                    image={details.image}
                  />
                </Block>
                <Block flex={false}>
                  <Photo
                    content={true}
                    size={80}
                    height={80}
                    card
                    image={details.image}
                  />
                </Block>
                <Block flex={false}>
                  <Button style={styles.plus}>
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
  );
}
