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

  message: {
    fontSize: theme.sizes.caption
  },

  checkbox: {
    marginTop: theme.sizes.body,
    fontSize: theme.sizes.caption,
    paddingHorizontal: theme.sizes.base,
    color: theme.colors.gray
  },

  block: {
    marginTop: theme.sizes.base
  }
})