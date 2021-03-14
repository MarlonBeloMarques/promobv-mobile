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

  function onPrefix() {
    if(signed) {
      setPrefix(Linking.makeUrl('/promotions/'))

      return prefix
    } else {
      setPrefix(Linking.makeUrl('/'))

      return prefix
    }
  }

  useEffect(() => {
    async function getUrlInitial() {
      if(signed) {
        let url = await Linking.getInitialURL()
        //app desenv
        if('details' === url.substring(27,34)) {
          setPrefix(Linking.makeUrl('/'))
        }
        //app prod
        //if('details' === url.substring(10,17)) {
        ////  setPrefix(Linking.makeUrl('/'))
        //}
      }
    }

    onPrefix()
    getUrlInitial()
  }, [])
    
  console.log(signed)
  console.log(token)
  
  const Routes = createRoutes(signed);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Routes uriPrefix={prefix} />
    </View>
  );
}
