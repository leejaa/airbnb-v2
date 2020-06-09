import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/react-hooks";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../css/tailwind.css';
import { withApollo } from "../apollo/client";
import store, { persistor } from "../redux/store";

class MyApp extends App<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { Component, pageProps, apolloClient, isAuth }: any = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Component {...pageProps} isAuth={ isAuth }/>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);