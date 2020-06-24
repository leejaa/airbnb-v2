import React, { useEffect, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AsyncStorage } from 'react-native';
import * as Network from 'expo-network';
import Auth from "../navigation/Auth";
import { NavigationContainer } from "@react-navigation/native";
import Main from "../navigation/Main";
import { rootState } from "../redux/rootReducer";
import _ from "lodash";


export default () => {
  const { isLoggedIn = false } = useSelector((state: rootState) => state.usersReducer);
  const [isLogin, setIsLogin] = useState(false);
  const clear = useCallback(async () => {
    // await AsyncStorage.clear();
  }, []);
  useEffect(() => {
    const newIsLogin = _.clone(isLoggedIn);
    setIsLogin(newIsLogin);
  }, [isLoggedIn]);
  useEffect(() => {
    clear();
  }, []);
  return (
    <NavigationContainer>
      {
        isLogin ? (
            <Main />
        ) : (
            <Auth />
          )
      }
    </NavigationContainer>
  );
};
