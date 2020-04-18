import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import Gate from "./components/Gate";
import { client } from "./apollo/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Gate />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

