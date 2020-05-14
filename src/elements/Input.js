import React, { Component, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Icon from "react-native-vector-icons/Ionicons";
import Text from "./Text";
import Block from "./Block";
import Button from "./Button";
import { theme } from "../constants";
import { ThemeColors } from "react-navigation";

export default function Input(props) {
  const [isToggleSecure, setIsToggleSecure] = useState(false);

  function renderLabel() {
    const { label, error } = props;

    return (
      <Block padding={[0,0, theme.sizes.base - 10, 4]} flex={false}>
        {label ? 
          (<Text gray={!error} accent={error}>{label}</Text>)
        : null}
      </Block>
    );
  }

  function renderToggle() {
    const { secure, rightLabel } = props;
    const { toggleSecure } = isToggleSecure;

    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => setIsToggleSecure({ toggleSecure: !toggleSecure })}
      >
        {rightLabel ? (rightLabel) : (<Icon color={theme.colors.gray} size={theme.sizes.font * 1.35} name={!toggleSecure ? "md-eye" : "md-eye-off"}/>)}
      </Button>
    );
  }

  function renderRight() {
    const { rightLabel, rightStyle, onRightPress } = props;

    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  }

  const { next, done, email, phone, number, secure, error, style, reference, box, type } = props;
  const { toggleSecure } = isToggleSecure;
  const isSecure = toggleSecure ? false : secure;
  const inputStyles = [ 
    box ? { height: height, paddingTop: 12, paddingBottom: 12} : { height: theme.sizes.base * 3 },
    styles.input, 
    error && { borderColor: theme.colors.accent }, 
    style
   ]
  
   const keyType = next
                  ? 'next'
                  : done
                  ? 'done'
                  : 'done'
  
  const inputType = email ? "email-address"
                  : number ? "numeric"
                  : phone ? "phone-pad"
                  : "default";

  const [height, setHeight] = useState(theme.sizes.base * 3);

  if(props.mask) {
    return (
      <Block flex={false} margin={[theme.sizes.base / 1.5, 0]}>
        {renderLabel()}
        <TextInputMask
          value={props.value}
          type={type}
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          returnKeyType={keyType}
          onSubmitEditing={props.submitEditing}
          ref={reference}
          {...props}
        />
        {renderToggle()}
        {renderRight()}
      </Block>
    );
  } else {
    return (
      <Block flex={false} margin={[theme.sizes.base / 1.5, 0]}>
        {renderLabel()}
        <TextInput
          value={props.value}
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          returnKeyType={keyType}
          onSubmitEditing={props.submitEditing}
          ref={reference}
          {...props}
        />
        {renderToggle()}
        {renderRight()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    color: theme.colors.gray,
    paddingLeft: theme.sizes.base - 6,
    paddingRight: theme.sizes.base - 6,
  },
  toggle: {
    position: "absolute",
    alignItems: "flex-end",
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base * 2.4,
    paddingRight: theme.sizes.base - 6,
    right: 0,
  },
});

Input.propTypes = {
  submitEditing: () => {},
  mask: false
};
