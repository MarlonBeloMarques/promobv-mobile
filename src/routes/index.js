import React from 'react'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'

import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import PasswordScreen from '../screens/PasswordScreen'
import PromotionsScreen from '../screens/PromotionsScreen'
import DetailsScreen from '../screens/DetailsScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import TermsOfServiceScreen from '../screens/TermosOfServiceScreen'
import MyAccountScreen from '../screens/MyAccountScreen'
import ProfileScreen from '../screens/ProfileScreen'
import MyPromotionsScreen from '../screens/MyPromotionsScreen'
import EditScreen from '../screens/EditScreen'

import { Insert } from '../components'

import { DrawerActions } from "react-navigation-drawer";

import { Image, SafeAreaView, ScrollView, Platform } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

import { theme } from '../constants'
import { Text, Block, Button } from '../elements'
import { Transition } from 'react-native-reanimated'
import { logout } from '../services/auth'
import { useDispatch } from "react-redux";
import { signOutRequest } from "../store/modules/auth/actions";

const Header = (props) => {
  const dispatch = useDispatch();

  function onClickMenu() {
    props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  function onClickExit() {
    dispatch(signOutRequest());
    logout()
    props.navigation.navigate("login");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Block size={80} flex={false}>
        <Block 
          margin={[ Platform.OS === 'ios' ? theme.sizes.body - 5 : theme.sizes.body * 2.5, 0, 0, theme.sizes.title - 2]}
          color={theme.colors.primary} 
          flex={false} 
          row
          center
          >
          <Button style onPress={onClickMenu}>
            <Ionicons name={"ios-menu"} size={30} color={theme.colors.white} />
          </Button>
        </Block>
      </Block>
      <ScrollView>
        <DrawerItems {...props} ></DrawerItems>
        <Block onPress={onClickExit} margin={[theme.sizes.body - 5, 0, 0, theme.sizes.title - 2]} button>
          <Text bold white>Sair</Text>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
} 

const menu = createDrawerNavigator({
  Promoções: PromotionsScreen,
  "Inserir promoção": Insert,
  Notificações: NotificationsScreen,
  'Termos de Uso': TermsOfServiceScreen,
  'Minha conta': MyAccountScreen
},
{
  drawerBackgroundColor: theme.colors.primary,
  contentOptions: {
    activeBackgroundColor: 'rgba(18, 42, 72, 0.2)',
    activeTintColor: theme.colors.secondary,
    inactiveTintColor: theme.colors.white,
  },
  contentComponent: Header,
  unmountInactiveRoutes: true
});

const childrens = createStackNavigator({
  menu: {
    screen: menu,
    navigationOptions: {
      header: null
    }
  },
  Detalhes: {
    screen: DetailsScreen,
    navigationOptions: ({navigation, screenProps}) => ({
      title: (
        <Text bold white>
          Detalhes
        </Text>
      ),
      headerTitleAlign: "left",
      headerStyle: {
        height: Platform.OS === 'ios' ? theme.sizes.base * 6 : theme.sizes.base * 5, 
        shadowColor: "transparent",
        backgroundColor: theme.colors.primary
      },
      headerRight: (
       <Button style onPress={navigation.getParam('onClickDenounce')}>
         <Text white>Denunciar</Text>
       </Button>
      ),
      headerBackImage: (
        <Image source={require("../../assets/icons/back.png")} />
      ),
      headerBackTitleVisible: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        padding: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        padding: theme.sizes.base
      }
    })
  },
  Perfil: {
    screen: ProfileScreen,
    navigationOptions: {
      title: (
        <Text bold gray>
          Perfil
        </Text>
      ),
      headerTitleAlign: "left",
      headerStyle: {
        height: Platform.OS === "ios" ? theme.sizes.base * 6 : theme.sizes.base * 5,
        shadowColor: "transparent",
        backgroundColor: theme.colors.white,
        elevation: 0
      },
      headerBackImage: (
        <Image source={require("../../assets/icons/back.png")} />
      ),
      headerBackTitleVisible: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        padding: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        padding: theme.sizes.base
      }
    }
  },
  MinhasPromocoes: {
    screen: MyPromotionsScreen,
    navigationOptions: {
      title: (
        <Text bold gray>
          Minhas Promoções
        </Text>
      ),
      headerTitleAlign: "left",
      headerStyle: {
        height:
          Platform.OS === "ios" ? theme.sizes.base * 6 : theme.sizes.base * 5,
        shadowColor: "transparent",
        backgroundColor: theme.colors.white,
        elevation: 0
      },
      headerBackImage: (
        <Image source={require("../../assets/icons/back.png")} />
      ),
      headerBackTitleVisible: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        padding: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        padding: theme.sizes.base
      }
    }
  },
  Editar: {
    screen: EditScreen,
    navigationOptions: {
      title: (
        <Text bold gray>
          Editar promoções
        </Text>
      ),
      headerTitleAlign: "left",
      headerStyle: {
        height:
          Platform.OS === "ios" ? theme.sizes.base * 6 : theme.sizes.base * 5,
        shadowColor: "transparent",
        backgroundColor: theme.colors.white,
        elevation: 0
      },
      headerBackImage: (
        <Image source={require("../../assets/icons/back.png")} />
      ),
      headerBackTitleVisible: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        padding: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        padding: theme.sizes.base
      }
    }
  }
});

const screens = createStackNavigator(
  {
    login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    signup: {
      screen: SignupScreen,
      navigationOptions: {
        title: <Text bold gray>Cadastro</Text>,
        headerTitleAlign: "left"
      }
    },
    password: {
      screen: PasswordScreen,
      navigationOptions: {
        title: <Text bold gray>Recuperar senha</Text>,
        headerTitleAlign: "left"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: Platform.OS === 'ios' ? theme.sizes.base * 6 : theme.sizes.base * 5,
        shadowColor: "transparent",
        backgroundColor: theme.colors.white,
        elevation: 0
      },
      cardStyle: { backgroundColor: "white" },
      headerBackImage: (
        <Image source={require("../../assets/icons/back.png")} />
      ),
      headerBackTitleVisible: null,
      title: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: Platform.OS === 'ios' ? theme.sizes.base : 0,
        padding: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        marginLeft: Platform.OS === 'ios' ? theme.sizes.base : 0,
        padding: theme.sizes.base
      }
    }
  }
);


function getInitialRoute(signed) {
  
  if(signed) {
    return 'childrens'
  }

  return 'auth'
}

export default (signed) =>
  createAppContainer(
    createAnimatedSwitchNavigator({
      auth: screens,
      childrens : childrens
    },
    {
      initialRouteName: getInitialRoute(signed),
      transition: (
        <Transition.Together>
          <Transition.Out
            type='slide-left'
            interpolation='easeIn'
            durationMs={400}
          />
          <Transition.In 
            type='fade'
            durationMs={500}
          />
        </Transition.Together>
      )
    })

);
