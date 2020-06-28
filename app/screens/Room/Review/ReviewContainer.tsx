import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Keyboard, ActivityIndicator, View } from "react-native";
import ReviewPresenter from "./ReviewPresenter";
import { useSelectPhotoQuery, useSelectRoomsQuery, useSelectRoomQuery } from "../../../generated/graphql";
import _ from "lodash";

interface props {
}
export default ({ }: props) => {
  const route: any = useRoute();
  const { data, loading } = useSelectRoomQuery({
    variables: {
      id: parseInt(route?.params?.id ?? 0),
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
    <ReviewPresenter
      room={data?.selectRoom as any}
    />
  );
};