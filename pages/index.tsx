import React from "react";
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const TestQuery = gql`
  query TestQuery {
    photo {
      id
    }
  }
`

export default () => {
  const { loading, error, data } = useQuery(TestQuery)
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