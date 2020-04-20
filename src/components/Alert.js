import { Alert } from 'react-native'

const AlertMessage = (props) => {
  return Alert.alert(
    props.title,
    props.message,
    [
      { text: 'OK', onPress: () => {} }
    ],
    { cancelable: true }
  )
}

export default AlertMessage