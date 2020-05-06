import { StyleSheet } from 'react-native'
import { theme } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },

  plus: {
    backgroundColor: theme.colors.gray2,
    padding: 20,
    borderRadius: theme.sizes.radius,
    marginHorizontal: 10,
    marginTop: 10
  },

  profile: {
    width: 50,
    height: 50
  }
});
