import React, { useMemo } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { inputProps } from "./types";
import { SCREEN_WIDTH } from "../../utils";
import _ from "lodash";

const css001 = styled.TextInput`
  width: 80%;
  height: 100%;
  border: 1px solid grey;
  background-color: white;
  border-radius: 30px;
  font-weight: 500;
`;

const Input: React.FC<inputProps> = ({
  value,
  placeholder,
  isPassword = false,
  autoCapitalize,
  stateFn,
  keyboardType,
  cssType,
  placeholderTextColor,
}) => {
  const Container = useMemo(() => {
    let Container;
    switch (cssType) {
      case "css001":
        Container = _.clone(css001);
        break;
      default:
        Container = _.clone(css001);
        break;
    }
    return Container;
  }, [cssType]);
  return (
    <Container
      keyboardType={keyboardType}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={isPassword ? true : false}
      autoCapitalize={autoCapitalize}
      onChangeText={text => stateFn(text)}
      inlineImageLeft="md-search"
    />
  );
}

export default Input;