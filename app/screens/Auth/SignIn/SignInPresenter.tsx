import React from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import Btn from "../../../components/Auth/Btn";
import Input from "../../../components/Auth/Input";
import DismissKeyboard from "../../../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface props {
  googleLogin: any,
  googleLoading: boolean,
}

export default ({ googleLogin, googleLoading }: props) => (
  <DismissKeyboard>
    <Container>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior="position">
        <Btn text={"페이스북 계정으로 로그인"} onPress={googleLogin} iconName="facebook-with-circle" iconColor="blue" iconType="Entypo"></Btn>
        <Btn text={"구글 계정으로 로그인"} onPress={googleLogin} iconName="logo-google" iconColor="#5f6368" iconType="Ionicons" loading={googleLoading}></Btn>
      </KeyboardAvoidingView>
    </Container>
  </DismissKeyboard>
);