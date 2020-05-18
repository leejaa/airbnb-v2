import React, { useState } from 'react';
import * as Expo from "expo";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import { ApolloProvider } from "@apollo/react-hooks";
import { PersistGate } from "redux-persist/integration/react";
import { Asset } from "expo-asset";
import { Image } from "react-native";
import * as Font from "expo-font";
import store, { persistor } from "./redux/store";
import Gate from "./components/Gate";
import { client } from "./apollo/client";
import { Ionicons } from '@expo/vector-icons';


const cacheImages = (images: any[]) =>
  images.map((image: any) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts: any) => fonts.map((font: any) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAssets = async () => {
    const images = [
      require("./assets/icon.png"),
      require("./assets/splash.png"),
    ];
    const fonts = [Ionicons.font];
    const imagePromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts);
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  return (
    isReady ? (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Gate />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    ) : (
        <AppLoading
          onError={console.error}
          onFinish={handleFinish}
          startAsync={loadAssets as any}
        />
      )
  );
}

