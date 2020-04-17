import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any;
};


export type Photo = {
   __typename?: 'Photo';
  id: Scalars['String'];
  caption: Scalars['String'];
  file: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  photo: Array<Photo>;
};

export type TestQueryVariables = {};


export type TestQuery = (
  { __typename?: 'Query' }
  & { photo: Array<(
    { __typename?: 'Photo' }
    & Pick<Photo, 'id' | 'file' | 'caption'>
  )> }
);


export const TestDocument = gql`
    query test {
  photo {
    id
    file
    caption
  }
}
    `;

/**
 * __useTestQuery__
 *
 * To run a query within a React component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TestQuery, TestQueryVariables>) {
        return ApolloReactHooks.useQuery<TestQuery, TestQueryVariables>(TestDocument, baseOptions);
      }
export function useTestLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TestQuery, TestQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, baseOptions);
        }
export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestQueryResult = ApolloReactCommon.QueryResult<TestQuery, TestQueryVariables>;