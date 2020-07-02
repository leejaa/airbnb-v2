import React, { useState, useEffect, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, ActivityIndicator, View } from "react-native";
import HomePresenter from "./HomePresenter";
import { useSelectPhotoQuery, useSelectRoomsQuery } from "../../../generated/graphql";
import _ from "lodash";
import { getPlaceInfoList, setGlobalLoading } from "../../../redux/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../redux/rootReducer";
import styled from "styled-components/native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../utils";

const LoadingContainer = styled.View`
    width: ${SCREEN_WIDTH}px;
    height: ${SCREEN_HEIGHT}px;
`;
const LoadingContainer2 = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

interface props {
  token: string,
}
const pageSize = 5;
export default ({ token }: props) => {
  const dispatch = useDispatch();
  const { searchedPlaceWord, roomList = [], globalLoading = false } = useSelector((state: rootState) => state.homeReducer);
  const [skip, setSkip] = useState(0);
  const { data = [], loading = false, fetchMore, networkStatus } = useSelectRoomsQuery({
    variables: {
      first: pageSize,
      skip: 0
    },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  const filteredData = useMemo(() => {
    if (_.isEmpty(roomList)) {
      return _.clone(data);
    } else {
      return roomList;
    }
  }, [roomList]);
  if (_.isEmpty(filteredData)) {
    return (
      <LoadingContainer>
        <LoadingContainer2>
          <ActivityIndicator size="large" color="#0000ff" />
        </LoadingContainer2>
      </LoadingContainer>
    );
  }
  return (
    <HomePresenter
      data={filteredData as any}
      fetchMore={fetchMore}
      pageSize={pageSize}
      skip={skip}
      loading={loading}
    />
  );
};