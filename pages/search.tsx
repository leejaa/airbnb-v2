import React, { useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import _ from "lodash";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  border-width: 1px;
`;
const RightContainer = styled.div`
  width: 50%;
  height: 100%;
  border-width: 1px;
`;
const Search = (props) => {
  
  return (
    <Layout props={props}>
      <Container>

      </Container>
    </Layout>
  );
};

export default Search;