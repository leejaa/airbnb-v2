import React, { useState, useEffect, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, ActivityIndicator, View } from "react-native";
import HomePresenter from "./HomePresenter";
import { useSelectPhotoQuery, useSelectRoomsQuery } from "../../../generated/graphql";
import _ from "lodash";
import { getPlaceInfoList } from "../../../redux/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../redux/rootReducer";

interface props {
  token: string,
}
const pageSize = 5;
export default ({ token }: props) => {
  const dispatch = useDispatch();
  const { searchedPlaceWord, roomList = [] } = useSelector((state: rootState) => state.homeReducer);
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
  if (_.isEmpty(data)) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
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