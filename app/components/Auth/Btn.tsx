import React from "react";
import { TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import PropTypes from "prop-types";
import colors from "../../colors";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import { btnProps } from "./types";

const { width } = Dimensions.get("screen");

const Button1 = styled.View`
  border-width: 1px;
  border-color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${SCREEN_WIDTH * 0.8}px;
  height: ${SCREEN_HEIGHT / 13}px;
  margin-bottom: ${SCREEN_HEIGHT / 25}px;
  position: relative;
  border-radius: 10px;
`;

const Container1 = styled.View`
  width: 16%;
  height: 100%;
  position: absolute;
  left: ${SCREEN_WIDTH / 25}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 14px;
`;

const Btn: React.FC<btnProps> = ({ loading = false, onPress, text, iconName, iconColor, iconType }) => (
  <TouchableOpacity onPress={loading ? null : onPress}>
    <Button1>
      {loading ? (
        <ActivityIndicator />
      ) : (
          <>
            <Container1>
              {
                iconType === "Entypo" && (
                  <Entypo name={iconName} size={30} color={iconColor} />
                )
              }
              {
                iconType === "Ionicons" && (
                  <Ionicons name={iconName} size={30} color={iconColor} />
                )
              }
            </Container1>
            <Text>{text}</Text>
          </>
        )}
    </Button1>
  </TouchableOpacity>
);

export default Btn;