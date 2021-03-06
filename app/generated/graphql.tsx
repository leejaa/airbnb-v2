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

export type CreateUserResult = {
   __typename?: 'createUserResult';
  success: Scalars['Boolean'];
  user: User;
};


export type Like = {
   __typename?: 'Like';
  id: Scalars['String'];
  roomId: Scalars['String'];
  userId: Scalars['String'];
  user?: Maybe<User>;
};

export type LoginResult = {
   __typename?: 'LoginResult';
  success: Scalars['Boolean'];
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type Mutation = {
   __typename?: 'Mutation';
  createUser: CreateUserResult;
  updatePhotos: UpdateResult;
  updateLike: UpdateResult;
  login: LoginResult;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationUpdateLikeArgs = {
  roomId?: Maybe<Scalars['Int']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  loginType?: Maybe<Scalars['String']>;
};

export type Photo = {
   __typename?: 'Photo';
  id: Scalars['String'];
  caption: Scalars['String'];
  file: Scalars['String'];
  roomId: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  selectReviews: Array<Review>;
  photo: Array<Photo>;
  selectLikes: Array<Like>;
  selectRoom: Room;
  selectRooms: Array<Room>;
  searchRooms: Array<Room>;
  selectUser: User;
  selectUser2: User;
  selectAllUsers: Array<User>;
  selectPhoto: Array<Photo>;
  createTestPhoto: Scalars['Boolean'];
};


export type QuerySelectRoomArgs = {
  id: Scalars['Int'];
};


export type QuerySelectRoomsArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QuerySearchRoomsArgs = {
  searchedPlaceWord?: Maybe<Scalars['String']>;
};


export type QuerySelectUserArgs = {
  id: Scalars['Int'];
};


export type QuerySelectUser2Args = {
  email?: Maybe<Scalars['String']>;
};


export type QuerySelectAllUsersArgs = {
  email?: Maybe<Scalars['String']>;
};


export type QuerySelectPhotoArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type Review = {
   __typename?: 'Review';
  id: Scalars['String'];
  review: Scalars['String'];
  createdAt: Scalars['String'];
  roomId: Scalars['Int'];
  userId: Scalars['Int'];
  user?: Maybe<User>;
  room?: Maybe<Room>;
};

export type Room = {
   __typename?: 'Room';
  id: Scalars['String'];
  address: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  price: Scalars['Int'];
  score: Scalars['Int'];
  userId: Scalars['Int'];
  user: User;
  photo: Array<Photo>;
  like?: Maybe<Array<Like>>;
  review?: Maybe<Array<Review>>;
};

export type UpdateResult = {
   __typename?: 'UpdateResult';
  success: Scalars['Boolean'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
};

export type UpdateLikeMutationVariables = {
  roomId?: Maybe<Scalars['Int']>;
};


export type UpdateLikeMutation = (
  { __typename?: 'Mutation' }
  & { updateLike: (
    { __typename?: 'UpdateResult' }
    & Pick<UpdateResult, 'success'>
  ) }
);

export type CreateUserMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'createUserResult' }
    & Pick<CreateUserResult, 'success'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  loginType?: Maybe<Scalars['String']>;
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'success' | 'accessToken' | 'refreshToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'name'>
    ) }
  ) }
);

export type SelectUserQueryVariables = {
  id: Scalars['Int'];
};


export type SelectUserQuery = (
  { __typename?: 'Query' }
  & { selectUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  ) }
);

export type SelectPhotoQueryVariables = {};


export type SelectPhotoQuery = (
  { __typename?: 'Query' }
  & { selectPhoto: Array<(
    { __typename?: 'Photo' }
    & Pick<Photo, 'id' | 'file' | 'caption'>
  )> }
);

export type SelectRoomsQueryVariables = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type SelectRoomsQuery = (
  { __typename?: 'Query' }
  & { selectRooms: Array<(
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name' | 'address' | 'country' | 'description' | 'lat' | 'lng' | 'price' | 'score'>
    & { photo: Array<(
      { __typename?: 'Photo' }
      & Pick<Photo, 'id' | 'file'>
    )>, like?: Maybe<Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'id'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id'>
      )> }
    )>> }
  )> }
);

export type SearchRoomsQueryVariables = {
  searchedPlaceWord: Scalars['String'];
};


export type SearchRoomsQuery = (
  { __typename?: 'Query' }
  & { searchRooms: Array<(
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name' | 'address' | 'country' | 'description' | 'lat' | 'lng' | 'price' | 'score'>
    & { photo: Array<(
      { __typename?: 'Photo' }
      & Pick<Photo, 'id' | 'file'>
    )> }
  )> }
);

export type SelectRoomQueryVariables = {
  id: Scalars['Int'];
};


export type SelectRoomQuery = (
  { __typename?: 'Query' }
  & { selectRoom: (
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name' | 'address' | 'country' | 'description' | 'lat' | 'lng' | 'price' | 'score'>
    & { photo: Array<(
      { __typename?: 'Photo' }
      & Pick<Photo, 'id' | 'file'>
    )>, like?: Maybe<Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'id'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id'>
      )> }
    )>>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar' | 'email'>
    ), review?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'review' | 'createdAt'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'avatar' | 'name' | 'email'>
      )> }
    )>> }
  ) }
);


export const UpdateLikeDocument = gql`
    mutation updateLike($roomId: Int) {
  updateLike(roomId: $roomId) {
    success
  }
}
    `;
export type UpdateLikeMutationFn = ApolloReactCommon.MutationFunction<UpdateLikeMutation, UpdateLikeMutationVariables>;

/**
 * __useUpdateLikeMutation__
 *
 * To run a mutation, you first call `useUpdateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLikeMutation, { data, loading, error }] = useUpdateLikeMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useUpdateLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLikeMutation, UpdateLikeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateLikeMutation, UpdateLikeMutationVariables>(UpdateLikeDocument, baseOptions);
      }
export type UpdateLikeMutationHookResult = ReturnType<typeof useUpdateLikeMutation>;
export type UpdateLikeMutationResult = ApolloReactCommon.MutationResult<UpdateLikeMutation>;
export type UpdateLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLikeMutation, UpdateLikeMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($email: String!, $password: String!, $name: String) {
  createUser(email: $email, password: $password, name: $name) {
    success
    user {
      id
      name
      email
    }
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!, $loginType: String) {
  login(email: $email, password: $password, loginType: $loginType) {
    success
    accessToken
    refreshToken
    user {
      id
      email
      name
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      loginType: // value for 'loginType'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SelectUserDocument = gql`
    query selectUser($id: Int!) {
  selectUser(id: $id) {
    id
    name
    email
  }
}
    `;

/**
 * __useSelectUserQuery__
 *
 * To run a query within a React component, call `useSelectUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSelectUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SelectUserQuery, SelectUserQueryVariables>) {
        return ApolloReactHooks.useQuery<SelectUserQuery, SelectUserQueryVariables>(SelectUserDocument, baseOptions);
      }
export function useSelectUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SelectUserQuery, SelectUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SelectUserQuery, SelectUserQueryVariables>(SelectUserDocument, baseOptions);
        }
export type SelectUserQueryHookResult = ReturnType<typeof useSelectUserQuery>;
export type SelectUserLazyQueryHookResult = ReturnType<typeof useSelectUserLazyQuery>;
export type SelectUserQueryResult = ApolloReactCommon.QueryResult<SelectUserQuery, SelectUserQueryVariables>;
export const SelectPhotoDocument = gql`
    query selectPhoto {
  selectPhoto {
    id
    file
    caption
  }
}
    `;

/**
 * __useSelectPhotoQuery__
 *
 * To run a query within a React component, call `useSelectPhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectPhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectPhotoQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelectPhotoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SelectPhotoQuery, SelectPhotoQueryVariables>) {
        return ApolloReactHooks.useQuery<SelectPhotoQuery, SelectPhotoQueryVariables>(SelectPhotoDocument, baseOptions);
      }
export function useSelectPhotoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SelectPhotoQuery, SelectPhotoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SelectPhotoQuery, SelectPhotoQueryVariables>(SelectPhotoDocument, baseOptions);
        }
export type SelectPhotoQueryHookResult = ReturnType<typeof useSelectPhotoQuery>;
export type SelectPhotoLazyQueryHookResult = ReturnType<typeof useSelectPhotoLazyQuery>;
export type SelectPhotoQueryResult = ApolloReactCommon.QueryResult<SelectPhotoQuery, SelectPhotoQueryVariables>;
export const SelectRoomsDocument = gql`
    query selectRooms($first: Int, $skip: Int) {
  selectRooms(first: $first, skip: $skip) {
    id
    name
    address
    country
    description
    lat
    lng
    price
    score
    photo {
      id
      file
    }
    like {
      id
      user {
        id
      }
    }
  }
}
    `;

/**
 * __useSelectRoomsQuery__
 *
 * To run a query within a React component, call `useSelectRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectRoomsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useSelectRoomsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SelectRoomsQuery, SelectRoomsQueryVariables>) {
        return ApolloReactHooks.useQuery<SelectRoomsQuery, SelectRoomsQueryVariables>(SelectRoomsDocument, baseOptions);
      }
export function useSelectRoomsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SelectRoomsQuery, SelectRoomsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SelectRoomsQuery, SelectRoomsQueryVariables>(SelectRoomsDocument, baseOptions);
        }
export type SelectRoomsQueryHookResult = ReturnType<typeof useSelectRoomsQuery>;
export type SelectRoomsLazyQueryHookResult = ReturnType<typeof useSelectRoomsLazyQuery>;
export type SelectRoomsQueryResult = ApolloReactCommon.QueryResult<SelectRoomsQuery, SelectRoomsQueryVariables>;
export const SearchRoomsDocument = gql`
    query searchRooms($searchedPlaceWord: String!) {
  searchRooms(searchedPlaceWord: $searchedPlaceWord) {
    id
    name
    address
    country
    description
    lat
    lng
    price
    score
    photo {
      id
      file
    }
  }
}
    `;

/**
 * __useSearchRoomsQuery__
 *
 * To run a query within a React component, call `useSearchRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRoomsQuery({
 *   variables: {
 *      searchedPlaceWord: // value for 'searchedPlaceWord'
 *   },
 * });
 */
export function useSearchRoomsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchRoomsQuery, SearchRoomsQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchRoomsQuery, SearchRoomsQueryVariables>(SearchRoomsDocument, baseOptions);
      }
export function useSearchRoomsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchRoomsQuery, SearchRoomsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchRoomsQuery, SearchRoomsQueryVariables>(SearchRoomsDocument, baseOptions);
        }
export type SearchRoomsQueryHookResult = ReturnType<typeof useSearchRoomsQuery>;
export type SearchRoomsLazyQueryHookResult = ReturnType<typeof useSearchRoomsLazyQuery>;
export type SearchRoomsQueryResult = ApolloReactCommon.QueryResult<SearchRoomsQuery, SearchRoomsQueryVariables>;
export const SelectRoomDocument = gql`
    query selectRoom($id: Int!) {
  selectRoom(id: $id) {
    id
    name
    address
    country
    description
    lat
    lng
    price
    score
    photo {
      id
      file
    }
    like {
      id
      user {
        id
      }
    }
    user {
      id
      name
      avatar
      email
    }
    review {
      id
      review
      createdAt
      user {
        id
        avatar
        name
        email
      }
    }
  }
}
    `;

/**
 * __useSelectRoomQuery__
 *
 * To run a query within a React component, call `useSelectRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSelectRoomQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SelectRoomQuery, SelectRoomQueryVariables>) {
        return ApolloReactHooks.useQuery<SelectRoomQuery, SelectRoomQueryVariables>(SelectRoomDocument, baseOptions);
      }
export function useSelectRoomLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SelectRoomQuery, SelectRoomQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SelectRoomQuery, SelectRoomQueryVariables>(SelectRoomDocument, baseOptions);
        }
export type SelectRoomQueryHookResult = ReturnType<typeof useSelectRoomQuery>;
export type SelectRoomLazyQueryHookResult = ReturnType<typeof useSelectRoomLazyQuery>;
export type SelectRoomQueryResult = ApolloReactCommon.QueryResult<SelectRoomQuery, SelectRoomQueryVariables>;