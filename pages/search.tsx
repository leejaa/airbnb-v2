import React, { useMemo, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { LeftOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";
import _ from "lodash";
import { useSelectRoomsQuery } from "../generated/graphql";
import { WEBSCREEN_HEIGHT, WEBSCREEN_WIDTH, IS_CLIENT } from "../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../redux/rootReducer";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
`;
const MapContainer = styled.div`
  width: 100%;
  height: ${WEBSCREEN_HEIGHT}px;
  background-color: white;
`;
const RoomsContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  overflow: hidden;
`;
const RoomsContainer2 = styled.div`
  border-width: 1px;
  width: 100%;
  height: 50000px;
  margin-top: 300px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 100;
  padding-left: ${WEBSCREEN_WIDTH / 16}px;
  padding-right: ${WEBSCREEN_WIDTH / 16}px;
`;
const RoomsContainer2Top = styled.div`
  width: 100%;
  height: ${WEBSCREEN_HEIGHT / 30}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RoomsContainer2TopLabel = styled.div`
  width: 14%;
  border-width: 2px;
  border-color: rgba(32, 32, 32, 0.2);
  border-radius: 30px;
`;
const RoomsContainer2Title = styled.div`
  width: 100%;
  height: ${WEBSCREEN_HEIGHT / 18}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RoomsContainer2TitleSpan = styled.span`
  font-weight: 600;
`;
const RoomCardContainer = styled.div`
  border-width: 1px;
  width: 100%;
  height: ${WEBSCREEN_HEIGHT / 2.5}px;
  margin-top: ${WEBSCREEN_HEIGHT / 15}px;
`;

const Search = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { roomList = [] } = useSelector((state: rootState) => state.roomReducer);
  useEffect(() => {
  }, []);
  if (!IS_CLIENT) {
    <Layout props={props}>
      <Container>
        로딩중...
      </Container>
    </Layout>
  }
  return (
    <Layout props={props} headerCssType="002">
      <MapContainer></MapContainer>
      <RoomsContainer>
        <RoomsContainer2>
          <RoomsContainer2Top>
            <RoomsContainer2TopLabel></RoomsContainer2TopLabel>
          </RoomsContainer2Top>
          <RoomsContainer2Title>
            <LeftOutlined style={{ fontSize: 17, color: 'black' }}/>
            <RoomsContainer2TitleSpan>300개 이상의 숙소</RoomsContainer2TitleSpan>
            <div></div>
          </RoomsContainer2Title>
          <RoomCardContainer></RoomCardContainer>
          <RoomCardContainer></RoomCardContainer>
          <RoomCardContainer></RoomCardContainer>
        </RoomsContainer2>
      </RoomsContainer>
    </Layout>
  );
};

export default Search;