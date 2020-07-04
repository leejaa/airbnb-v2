import React, { useState, useEffect, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Keyboard, ActivityIndicator, View } from "react-native";
import RoomDetailPresenter from "./RoomDetailPresenter";
import { useSelectPhotoQuery, useSelectRoomsQuery, useSelectRoomQuery } from "../../../generated/graphql";
import _ from "lodash";

interface props {
}
export default ({ }: props) => {
  const route: any = useRoute();
  const { data: data2 = [] } : any = useSelectRoomsQuery({
    variables: {
      first: 5,
      skip: 0
    },
    fetchPolicy: "cache-first",
  });
  const id = useMemo(() => {
    const idList = _.map(data2.selectRooms, item => item.id);
    return parseInt(idList[Math.floor(Math.random() * idList.length)]);
  }, [data2]);
  console.log('id', id);
  const { data, loading } = useSelectRoomQuery({
    variables: {
      id,
    }
  });
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <RoomDetailPresenter
      room={data?.selectRoom as any}
    />
  );
};