import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/react-hooks";
import { withApollo } from "../apollo/client";
import store, { persistor } from "../redux/store";

class MyApp extends App<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { Component, pageProps, apolloClient }: any = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);