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
  }
})