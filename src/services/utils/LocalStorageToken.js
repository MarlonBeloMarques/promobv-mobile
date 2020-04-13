import * as SecureStore from 'expo-secure-store'

export default async function LocalStorageToken () {
  try {
    let user_token = await SecureStore.getItemAsync('user_token')

    if(user_token) {
      user_token = JSON.parse(user_token)

      return `${user_token.type} ${user_token.token}`
    }

    return null
  } catch (error) {
    return null
  }
}