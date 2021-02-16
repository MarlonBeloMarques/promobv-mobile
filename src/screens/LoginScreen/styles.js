import { StyleSheet } from 'react-native'
import { theme } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },

  forgotPassword: {
    marginTop: 1,
    marginBottom: theme.sizes.base
  },

  signup: {
    marginTop: theme.sizes.base / 2
  },

  logo: {
    width: 150,
    height: 150
  }
});
