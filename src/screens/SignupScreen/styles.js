import { StyleSheet, Dimensions } from 'react-native'
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

  message: {
    fontSize: theme.sizes.caption
  },

  textCheckbox: {
    fontSize: 10,
    color: theme.colors.gray,
    width: 300
  },

  block: {
    marginTop: theme.sizes.base
  }
})