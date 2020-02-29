import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppContainer from './src/routes'

console.disableYellowBox = true

export default function App() {
  return (
    <View style={{flex: 1}}>
      <AppContainer/>
    </View>
  )
}

