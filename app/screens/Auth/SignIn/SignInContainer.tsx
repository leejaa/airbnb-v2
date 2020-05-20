import React, { useState, useCallback } from "react";
import utils from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { userLogin, logIn } from "../../../redux/usersSlice";
import SignInPresenter from "./SignInPresenter";
import { Alert, AsyncStorage } from "react-native";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, FACEBOOK_APP_ID } from "../../../env";
import { useLoginMutation } from "../../../generated/graphql";
import { rootState } from "../../../redux/rootReducer";

export default ({ route }: any) => {
  const dispatch = useDispatch();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [login] = useLoginMutation();
  const facebookLogin = useCallback(async () => {
    setFacebookLoading(true);
    try {
      await Facebook.initializeAsync(FACEBOOK_APP_ID);
      const {
        type,
        token,
      } : any = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/v7.0/me?access_token=${token}&fields=id,name`);
        const data : any = await response.json();
        try {
          const result: any = await login({
            variables: {
              email: data?.id ?? '',
              password: '',
              loginType: 'facebook',
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
        Alert.alert('로그인 실패');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally {
      setFacebookLoading(false);
    }
  }, []);
  const googleLogin = useCallback(async () => {
    setGoogleLoading(true);
    const config = {
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ['profile', 'email'],
    };
    const { type, accessToken, user }: any = await Google.logInAsync(config);
    if (type === 'success') {
      try {
        const result: any = await login({
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
      facebookLogin={facebookLogin}
      facebookLoading={facebookLoading}
    />
  );
};