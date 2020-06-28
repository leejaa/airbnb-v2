import React, { useCallback, useMemo } from "react";
import styled from "styled-components/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import utils from "../../utils";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

const Container = styled.TouchableOpacity`
`;
const Container2 = styled.TouchableOpacity`
  border-radius: 50;
  background-color: white;
`;

export default ({
  cssType = "001",
  color = "black",
  size = 24,
}) => {
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);
  const BackBtn001 = useMemo(() => {
    return (
      <Container onPress={goBack}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </Container>
    );
  }, []);
  const BackBtn002 = useMemo(() => {
    return (
      <Container onPress={goBack}>
        <AntDesign name="close" size={size} color={color} />
      </Container>
    );
  }, [color, size]);
  let BackBtn;
  switch (cssType) {
    case "001":
      BackBtn = _.clone(BackBtn001);
      break;
    case "002":
      BackBtn = _.clone(BackBtn002);
      break;
    default:
      BackBtn = _.clone(BackBtn001);
      break;
  }
  return (
    <>
      {BackBtn}
    </>
  );
}