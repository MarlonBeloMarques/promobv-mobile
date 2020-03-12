import React from 'react'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

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

import { Image } from 'react-native'

import { theme } from '../constants'
import { Text } from '../elements'
import { Transition } from 'react-native-reanimated'

const menu = createDrawerNavigator({
  Promoções: PromotionsScreen,
  "Inserir promoção": Insert,
  Notificações: NotificationsScreen,
  'Termos de Uso': TermsOfServiceScreen,
  'Minha conta': MyAccountScreen

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
    navigationOptions: {
      title: (
        <Text bold white>
          Detalhes
        </Text>
      ),
      headerTitleAlign: "left",
      headerStyle: {
        height: theme.sizes.base * 6,
        shadowColor: "transparent",
        backgroundColor: theme.colors.primary
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
        height: theme.sizes.base * 6,
        shadowColor: "transparent",
        backgroundColor: theme.colors.white
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
        height: theme.sizes.base * 6,
        shadowColor: "transparent",
        backgroundColor: theme.colors.white
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
        height: theme.sizes.base * 6,
        shadowColor: "transparent",
        backgroundColor: theme.colors.white
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
    login: LoginScreen,
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
        height: theme.sizes.base * 6,
        shadowColor: "transparent",
        backgroundColor: theme.colors.white
      },
      cardStyle: { backgroundColor: "white" },
      headerBackImage: (
        <Image source={require("../../assets/icons/back.png")} />
      ),
      headerBackTitleVisible: null,
      title: null,
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
);

const routes =createAnimatedSwitchNavigator({
  auth: screens,
  childrens : childrens
},
{
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

export default createAppContainer(routes);
