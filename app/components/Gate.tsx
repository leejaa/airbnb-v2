import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Network from 'expo-network';
import Auth from "../navigation/Auth";
import { NavigationContainer } from "@react-navigation/native";
import Main from "../navigation/Main";

export default () => {
  return (
    <NavigationContainer>
      {true ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};