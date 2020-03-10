import { StyleSheet } from 'react-native'
import { theme } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
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
    marginTop: 1
  },

  signup: {
    marginTop: theme.sizes.base
  },

  end: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: theme.sizes.padding
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: theme.sizes.base * 5
  }
});
