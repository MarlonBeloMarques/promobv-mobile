import { StyleSheet } from 'react-native'
import { theme } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },

  input: {
    borderColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.gray3
  },

  inputError: {
    borderBottomColor: theme.colors.accent
  },

  forgotPassword: {
    marginTop: 1,
    marginBottom: theme.sizes.base
  },

  signup: {
    marginTop: theme.sizes.base / 2
  },

  end: {
    flex: 0.3,
    justifyContent: "flex-end"
  },

  logo: {
    width: 150,
    height: 150
  }
});
