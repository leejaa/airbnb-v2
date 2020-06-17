import React, { useCallback } from "react";
import styled from "styled-components/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import utils from "../../utils";
import { useNavigation } from "@react-navigation/native";

const Container = styled.TouchableOpacity`
`;

export default () => {
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);
  return (
    <Container onPress={goBack}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </Container>
  );
}