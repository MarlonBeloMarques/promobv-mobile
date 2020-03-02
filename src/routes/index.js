import React from 'react'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import PasswordScreen from '../screens/PasswordScreen'
import PromotionsScreen from '../screens/PromotionsScreen'

import { Image } from 'react-native'

import { theme } from '../constants'
import { Text } from '../elements'
import { Transition } from 'react-native-reanimated'

const menu = createDrawerNavigator({
  promoções: PromotionsScreen
})

const screens = createStackNavigator(
  {
    login: LoginScreen,
    signup: {
      screen: SignupScreen,
      navigationOptions: {
        title: <Text gray>Cadastro</Text>,
        headerTitleAlign: "left"
      }
    },
    password: {
      screen: PasswordScreen,
      navigationOptions: {
        title: <Text gray>Recuperar senha</Text>,
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
  menu: menu
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
