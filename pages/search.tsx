import React, { useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import _ from "lodash";
import { useSelectRoomsQuery } from "../generated/graphql";
import { WEBSCREEN_HEIGHT, WEBSCREEN_WIDTH } from "../utils/utils";

const Container = styled.div`
  width: 100%;
  padding-left: ${WEBSCREEN_WIDTH / 15}px;
  padding-right: ${WEBSCREEN_WIDTH / 15}px;
`;
const CardContainer = styled.div`
  width: 100%;
  height: ${WEBSCREEN_HEIGHT / 2.7}px;
  border-width: 1px;
`;

const Search = (props) => {
  const { data, loading, fetchMore } = useSelectRoomsQuery({
    variables: {
      first: 10,
      skip: 0,
    },
    fetchPolicy: "cache-first",
  });
  return (
    <Layout props={props}>
      <Container>
        <CardContainer></CardContainer>
      </Container>
    </Layout>
  );
};

export default Search;