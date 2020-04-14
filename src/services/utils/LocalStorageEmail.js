import * as SecureStore from "expo-secure-store";

export default async function LocalStorageEmail() {
  try {
    let user_email = await SecureStore.getItemAsync("user_email");

    if (user_email) {
      user_email = JSON.parse(user_email);

      return `${user_email}`;
    }

    return null;
  } catch (error) {
    return null;
  }
}
