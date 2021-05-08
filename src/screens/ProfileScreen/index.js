import React, { useState, useEffect, useRef } from "react";
import { Block, Input, Button, Text, Photo } from "../../elements";
import { theme } from "../../constants";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator";

import profileImage from '../../../assets/images/profile-image.png'

import { ScrollView } from "react-native-gesture-handler";

import { getUser, updateUser, setUserPicture } from "../../services/user";
import AlertMessage from "../../components/Alert";
import { ModalLoader } from "../../components";
import { DotIndicator, MaterialIndicator } from 'react-native-indicators'
import { logout } from "../../services/auth";

export default function ProfileScreen(props) {

  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [cpf, setCpf] = useState('')
  const [avatar, setAvatar] = useState()
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')

  const [loading, setloading] = useState(true)
  const [loader, setLoader] = useState(false)
  const [loaderImage, setLoaderImage] = useState(false)

  const cpfRef = useRef()
  const numberRef = useRef()
  const dateOfBirthRef = useRef()

  console.log(avatar)

  useEffect(() => {
    async function loadProfile() {

      const email = await SecureStore.getItemAsync('user_email')

      await getUser(JSON.parse(email)).then((res) => {
        const response = res.data;

        setId(response.id)
        setName(response.nome)
        setNickname(response.apelido)
        setCpf(response.cpf)
        setAvatar(response.urlProfile)
        setDateOfBirth(response.dataDeNascimento)
        setNumber(response.telefone)
        setEmail(response.email)
      }, function({response}) {
          if (response.status === 403) {
            AlertMessage({
              title: "Atenção",
              message: "Sua sessão expirou.",
            });
            logout()
            props.navigation.navigate("login");
          }
      });

      setloading(false)
    }

    getPermissionAsync();
    loadProfile();
  }, []);

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissões de rolagem da câmera para fazer isso funcionar!');
      }
    }
  }

  async function submitPicture(photo) {

    setLoaderImage(true)

    let localUri = photo.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });

    await setUserPicture(formData).then(res => {
      console.log(res)
    })

    setAvatar(photo.uri);
    setLoaderImage(false)
  }

  async function resizePicture(photo) {
    const manipulatedImage = await ImageManipulator.manipulateAsync(photo.uri, [
      { resize: { width: 500 } },
    ]);

    return manipulatedImage;
  }

  async function getImageGallery() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
      });
      if (!result.cancelled) {
        const picture = await resizePicture(result);
        submitPicture(picture);
      }
    } catch (E) {}
  };

  function unmaskCpf(cpf) {
    return cpf
      .split(".")
      .join("")
      .split(".")
      .join("")
      .split(".")
      .join("")
      .split("-")
      .join("");
  }

  async function handleSubmit() {
    try {

      setLoader(true)
      await updateUser(id, name, unmaskCpf(cpf), number, dateOfBirth).then(res => {
        
        switch (res.status) {
          case 204:
            AlertMessage({
              title: 'Sucesso',
              message: 'Seus dados foram atualizados com sucesso.'
            })
            
            setLoader(false)
            break;
        
          default:
            break;
        }
      })

    } catch ({ response }) {
      setLoader(false)
    }
  }

  return (
    <ScrollView backgroundColor="white" showsVerticalScrollIndicator={false}>
      {loading && <ModalLoader loading={loading} />}
      <Block
        padding={[0, theme.sizes.padding]}
        space="between"
        color={theme.colors.white}
      >
        <Block padding={[theme.sizes.padding, 0, 0, 0]} center row>
          {loaderImage && (
            <Block
              margin={[0, 0, 0, theme.sizes.caption]}
              padding={[theme.sizes.caption - 2, 0]}
              flex={false}
              center
              middle
            >
              <MaterialIndicator color={theme.colors.tertiary} size={16} />
            </Block>
          )}
          {!loaderImage && (
            <Button onPress={() => getImageGallery()} style>
              {avatar == null && <Photo avatar image={profileImage} />}
              {avatar != null && <Photo avatar image={avatar} />}
            </Button>
          )}
          <Block margin={[0, 0, 0, theme.sizes.header]}>
            <Text gray>Inserir imagem</Text>
          </Block>
        </Block>
        <Block margin={[theme.sizes.header, 0]} flex={false}>
          <Input
            label="Nome completo"
            defaultValue={name}
            onChangeText={setName}
            next
            submitEditing={() => cpfRef.current._inputElement.focus()}
          />
          <Input
            label="CPF"
            mask={true}
            type={"cpf"}
            number
            value={cpf}
            defaultValue={cpf}
            onChangeText={setCpf}
            reference={cpfRef}
            next
            submitEditing={() => numberRef.current._inputElement.focus()}
          />
          <Input
            label="Telefone"
            mask={true}
            type={"cel-phone"}
            number
            value={number}
            defaultValue={number}
            onChangeText={setNumber}
            reference={numberRef}
            next
            submitEditing={() => dateOfBirthRef.current._inputElement.focus()}
          />
        </Block>
        <Block row>
          <Block padding={[0, theme.sizes.padding * 6, 0, 0]}>
            <Input
              label="Data de nascimento"
              mask={true}
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY",
              }}
              number
              value={dateOfBirth}
              defaultValue={dateOfBirth}
              onChangeText={setDateOfBirth}
              reference={dateOfBirthRef}
              done
            />
          </Block>
        </Block>
        <Block padding={[theme.sizes.padding, 0]}>
          <Button onPress={handleSubmit} color={theme.colors.primary}>
            {loader && (
              <Block flex={false} center>
                <DotIndicator color={theme.colors.white} size={5} />
              </Block>
            )}
            {!loader && (
              <Text bold center white>
                Alterar
              </Text>
            )}
          </Button>
        </Block>
      </Block>
    </ScrollView>
  );
}
