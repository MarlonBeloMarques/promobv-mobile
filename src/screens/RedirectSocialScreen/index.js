import React, { useEffect, useState } from 'react';
import { Block, Button, Text } from '../../elements';
import { DotIndicator } from "react-native-indicators";
import { theme } from '../../constants';
import { StatusBar } from 'react-native';
import { logout, successfulLogin } from '../../services/auth';
import { getUser } from '../../services/user';
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { signInSuccess } from '../../store/modules/auth/actions';

const RedirectSocialScreen = (props) => {

  const [loader, setLoader] = useState(true);
  const [exceptionMsg, setExceptionMsg] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const param = props.navigation.getParam("paramToken");

    if(param.includes("error")) {
      setLoader(false);
      const exception = param.substring(6, param.length);
      setExceptionMsg(exception.split("%20").join(" ").split("%EA").join("ê"));
    } else {
      accessThroughSocial(param.substring(6, (param.length - 1)))
    }
  }, [])

  async function accessThroughSocial(token) {

    await logout();
    const authorization = token;
    await successfulLogin(authorization);

    const email = await SecureStore.getItemAsync('user_email')

    try {
      await getUser(JSON.parse(email)).then((res) => {
        let response = res.data;
        dispatch(signInSuccess(authorization, JSON.parse(response.id)));
      });

      setLoader(false);

      props.navigation.navigate("Promoções"); 
    } catch ({ response }) {
    }
  }

  return (
    <Block middle center padding={[0, theme.sizes.padding * 2]}>
      <StatusBar barStyle="dark-content" />
      {loader && <DotIndicator color={theme.colors.gray3} size={10} />}
      {!loader && (
        <>
          <Text gray3 center bold>
            {exceptionMsg}
          </Text>
          <Button style onPress={() => props.navigation.navigate("signup")}>
            <Block flex={false} padding={[theme.sizes.base, 0]}>
              <Text
                h3
                center
                primary
                style={{ textDecorationLine: "underline" }}
              >
                Ir para o cadastro
              </Text>
            </Block>
          </Button>
        </>
      )}
    </Block>
  );
}

export default RedirectSocialScreen;