import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { changeTest } from "../redux/usersSlice";
import { TestDocument } from "../generated/graphql";
import Header from "../components/Header";

export default () => {
  const { test } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(changeTest({}));
  }
  return (
    <div className="px-16">
      <Header />
    </div>
  );
};