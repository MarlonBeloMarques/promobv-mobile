import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, AsyncStorage, StatusBar } from "react-native";
import { Block, Input, Button, Text, Photo } from "../../elements";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

export default function DetailsScreen(props) {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [ratio, setRatio] = useState('')
  const id = props.navigation.getParam('id')

  useEffect(() => {

    async function loadDetail() {
      const response = await fetch(
        `http://localhost:3000/feed/${id}/?_expand=author`
      );
      const data = await response.json();

      setName(data.author.name)
      setAvatar(data.author.avatar)
      setImage(data.image)
      setDescription(data.description)
      setPrice(data.price)
      setRatio(data.aspectRatio)
    }

    loadDetail()
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle='light-content'></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          padding={theme.sizes.header}
          size={theme.sizes.base * 5}
          flex={false}
          row
        >
          <Photo avatar image={avatar} />
          <Block padding={[10, 10, 10, 20]}>
            <Text bold size={theme.sizes.header} color={theme.colors.gray}>
              {name}
            </Text>
          </Block>
        </Block>
        <Block size={300} flex={false}>
          <Photo height={100} size={100} image={image} />
        </Block>
        <Block>
          <Block border padding={[10, 50]} flex={false} row>
            <Button style {...props}>
              <Ionicons
                name={"ios-heart"}
                size={30}
                color={theme.colors.gray3}
              />
            </Button>
            <Block row right>
              <Button style {...props}>
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
              {description}
            </Text>
            <Block flex={false} margin={[12, 0]}>
              <Text light color={theme.colors.gray}>
                Tempor cupidatat occaecat duis excepteur aute tempor nostrud
                consequat enim labore dolore veniam.
              </Text>
            </Block>
            <Block padding={[20, 0, 10, 0]} flex={false} border>
              <Text h3 bold color={theme.colors.secondary}>
                {price}
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
                    <Text>Eu aliquip sunt.</Text>
                  </Block>
                  <Block margin={5} padding={[2, 0]}>
                    <Text>Eu aliquip sunt.</Text>
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
                    image={image}
                  />
                </Block>
                <Block flex={false}>
                  <Photo
                    content={true}
                    size={80}
                    height={80}
                    card
                    image={image}
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
