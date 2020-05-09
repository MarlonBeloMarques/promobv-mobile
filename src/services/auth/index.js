import api from '../api'
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  await SecureStore.deleteItemAsync('user_token');
  await SecureStore.deleteItemAsync('user_email');
  dispatch(signOutRequest());
}

export function refreshToken() {
  return api.post('/auth/refresh_token')
}

export function checkEmail(email) {
  return api.get(`/auth/check_email?value=${email}`)
}

export function newPassword(email, password) {
  return api.post('/auth/new_password', {email, password})
}