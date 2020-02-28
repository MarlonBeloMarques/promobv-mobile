import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import { Image } from 'react-native'

import { theme } from '../constants'

const screens = createStackNavigator(
  {
    login: LoginScreen,
    signup: SignupScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 6,
        shadowColor: "transparent",
        backgroundColor: theme.colors.white
      },
      cardStyle: { backgroundColor: "white" },
      headerBackImage: <Image source={require('../../assets/icons/back.png')} />,
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

export default createAppContainer(screens);
