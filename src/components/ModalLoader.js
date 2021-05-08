import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import { theme } from "../constants";
import { Block } from '../elements'

function ModalLoader({ loading }) {
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {}}
    >
      <Block
        center
        column
        space="around"
        color="#00000040"
      >
        <Block flex={false} color="white" space="around" center style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color={theme.colors.gray} animating={loading} />
        </Block>
      </Block>
    </Modal>
  );
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default ModalLoader;
