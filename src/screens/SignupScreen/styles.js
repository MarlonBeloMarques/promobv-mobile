import { StyleSheet } from 'react-native'
import { theme } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  message: {
    fontSize: theme.sizes.caption
  },

  checkbox: {
    backgroundColor: theme.colors.white,
    borderWidth: null
  }
})