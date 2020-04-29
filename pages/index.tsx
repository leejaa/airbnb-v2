import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { changeTest } from "../redux/usersSlice";
import { TestDocument } from "../generated/graphql";

export default () => {
  const { test } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(changeTest({}));
  }
  return (
    <Layout>
      <div>index....</div>
      <button onClick={ onClick }>버튼</button>
    </Layout>
  );
};