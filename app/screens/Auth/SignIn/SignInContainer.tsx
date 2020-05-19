import React, { useState, useCallback } from "react";
import utils from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import * as Google from 'expo-google-app-auth';
import { userLogin, logIn } from "../../../redux/usersSlice";
import SignInPresenter from "./SignInPresenter";
import { Alert, AsyncStorage } from "react-native";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "../../../env";
import { useLoginMutation } from "../../../generated/graphql";
import { rootState } from "../../../redux/rootReducer";

export default ({ route }: any) => {
  const dispatch = useDispatch();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [login] = useLoginMutation();
  const googleLogin = useCallback(async () => {
    setGoogleLoading(true);
    const config = {
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ['profile', 'email'],
    };
    const { type, accessToken, user } : any = await Google.logInAsync(config);
    if (type === 'success') {
      try {
        const result : any = await login({
          variables: {
            email: user?.email ?? '',
            password: '',
            loginType: 'google',
          }
        });
        if (result?.data?.login?.success ?? false) {
          Alert.alert('로그인 성공');
          dispatch(logIn({ token: result?.data?.login?.refreshToken ?? '' }));
        } else {
          Alert.alert('로그인 실패');
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setGoogleLoading(false);
      }
    } else {
      Alert.alert('구글 로그인 실패');
      setGoogleLoading(false);
    }
  }, []);
  return (
    <SignInPresenter
      googleLogin={googleLogin}
      googleLoading={googleLoading}
    />
  );
};