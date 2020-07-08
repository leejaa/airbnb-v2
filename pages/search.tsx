import React, { useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import _ from "lodash";
import { useSelectRoomsQuery } from "../generated/graphql";
import { WEBSCREEN_HEIGHT, WEBSCREEN_WIDTH, IS_CLIENT } from "../utils/utils";

const Container = styled.div`
  width: 100%;
`;

const Search = (props) => {
  const { data, loading, fetchMore } = useSelectRoomsQuery({
    variables: {
      first: 10,
      skip: 0,
    },
    fetchPolicy: "cache-first",
  });
  if (!IS_CLIENT) {
    <Layout props={props}>
      <Container>
        로딩중...
      </Container>
    </Layout>
  }
  return (
    <Layout props={props}>
      <Container>
      </Container>
    </Layout>
  );
};

export default Search;