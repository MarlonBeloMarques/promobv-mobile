import React from "react";
import { View, StatusBar } from "react-native";
import createRoutes from "../src/routes";

import { useSelector } from "react-redux";
import { Linking } from "expo";

console.disableYellowBox = true;

export default function App() {
  const { signed, token } = useSelector((state) => state.auth, () => true);
  const prefix = Linking.makeUrl('/')

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
