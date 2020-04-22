import React from "react";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import { Block } from "../elements";
import { theme } from "../constants";

const { height } = Dimensions.get("window");

const Gallery = (props) => {
  return (
    <Modal
      onBackdropPress={props.onRequestClose}
      isVisible={props.visible}
      swipeDirection={["down"]}
      onSwipeComplete={props.onRequestClose}
      onRequestClose={props.onRequestClose}
      style={{ justifyContent: "flex-end", margin: 0, marginTop: height / 9 }}
    >
      <Block middle column color={theme.colors.white}>
        {props.children}
      </Block>
    </Modal>
  );
};

Gallery.propTypes = {
  onRequestClose: () => {},
};

export default Gallery;
