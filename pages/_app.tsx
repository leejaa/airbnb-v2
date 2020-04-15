import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { withApollo } from "../apollo/client";

class MyApp extends App<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { Component, pageProps, apolloClient }: any = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);