import React from "react";
import { Platform, AsyncStorage } from "react-native";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { setContext } from "apollo-link-context";
import utils from "../utils";
import { IS_PRODUCTION } from "../env";

const ipAddress = IS_PRODUCTION ? "https://airbnb-v2.now.sh" : "http://localhost:3000";
const cache = new InMemoryCache({});
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(operation => {
          
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const authLink = setContext(async (_request, { headers }) => {
  const token = await AsyncStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : "",
    }
  };
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        return true;
      },
      fetchAccessToken: () => {
        return fetch(`${ipAddress}/api/refresh_token`, {
          method: "POST",
          credentials: "include"
        });
      },
      handleFetch: accessToken => {
      },
      handleError: err => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    authLink,
    requestLink,
    new HttpLink({
      uri: `${ipAddress}/api`,
      credentials: "include"
    })
  ]),
  cache,
  connectToDevTools: true,
});