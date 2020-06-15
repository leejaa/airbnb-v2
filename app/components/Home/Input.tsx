import React, { useMemo } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { inputProps } from "./types";
import utils, { SCREEN_WIDTH } from "../../utils";
import _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/usersSlice";

const css001 = styled.TextInput`
  width: 90%;
  height: 100%;
  font-weight: bold;
  font-size: ${SCREEN_WIDTH / 30}px;
`;
const Container2 = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid grey;
  background-color: white;
  border-radius: 30px;
`;
const Container3 = styled.View`
    width: 10%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
  const dispatch = useDispatch();
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
  const onFocus = () => {
    // dispatch(logOut({}));
  }
  return (
    <Container2>
      <Container3>
        <Ionicons
          name={utils.isAndroid() ? "md-search" : "ios-search"}
          size={SCREEN_WIDTH / 20}
        />
      </Container3>
      <Container
        keyboardType={keyboardType}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={isPassword ? true : false}
        autoCapitalize={autoCapitalize}
        onChangeText={text => stateFn(text)}
        inlineImageLeft="md-search"
        onFocus={onFocus}
      />
    </Container2>
  );
}

export default Input;