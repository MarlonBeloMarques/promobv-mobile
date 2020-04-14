import api from '../api'
import * as SecureStore from "expo-secure-store";

var jwtDecode = require("jwt-decode");

export function signIn (email, senha) {
  return api.post('/login', {email, senha}).then()
}

export async function successfulLogin(authorizationValue) {
  let tok = authorizationValue.substring(6)

  var decoded = jwtDecode(tok).sub;

  await SecureStore.setItemAsync("user_token", JSON.stringify(tok));
  await SecureStore.setItemAsync("user_email", JSON.stringify(decoded))
}

export async function logout() {
  await SecureStore.deleteItemAsync('user_token');
}