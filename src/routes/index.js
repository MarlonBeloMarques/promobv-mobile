import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

const screens = createStackNavigator(
  {
    login: LoginScreen,
    signup: SignupScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        shadowColor: "transparent",
      },
      cardStyle: { backgroundColor: "white" },
      headerBackTitleVisible: null,
      title: null,
      headerLeftContainerStyle: {
        alignItems: "center"
      },
      headerRightContainerStyle: {
        alignItems: "center"
      }
    }
  }
);

export default createAppContainer(screens);
