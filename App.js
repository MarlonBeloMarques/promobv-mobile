import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SecureStore from "expo-secure-store";

import AppContainer from './src/routes'
import { useState } from 'react';

console.disableYellowBox = true

export default function App() {
  const [Routes, setRoutes] = useState(() => AppContainer(false))

  useEffect(() => {
    function getToken() {
      try {
            
        setRoutes(() => AppContainer(true))
     
      } catch (error) {
      }
    }
    getToken()
  }, [])

  return (
    <View style={{flex: 1}}>
      <Routes/>
    </View>
  )
}

