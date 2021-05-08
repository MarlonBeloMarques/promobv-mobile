import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import createRoutes from "../src/routes";

import { useSelector } from "react-redux";
import * as Linking from 'expo-linking';
import { useState } from "react";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function App() {
  const { signed, token } = useSelector((state) => state.auth, () => true);
  const [prefix, setPrefix] = useState('')

  useEffect(() => {
    async function onPrefix() {
      setPrefix(Linking.makeUrl('/'))
    }

    onPrefix();
  }, [])
  
  const Routes = createRoutes(signed);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Routes uriPrefix={prefix} />
    </View>
  );
}
