import React from "react";
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const FeedQuery = gql`
  query FeedQuery {
    feed {
      id
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`

export default () => {
  const { loading, error, data } = useQuery(FeedQuery)
  if (loading) {
    return <div>Loading ...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <Layout>
      <div>{ JSON.stringify(data) }</div>
    </Layout>
  );
};