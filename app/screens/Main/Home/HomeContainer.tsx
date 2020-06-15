import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, ActivityIndicator, View } from "react-native";
import HomePresenter from "./HomePresenter";
import { useSelectPhotoQuery, useSelectRoomsQuery } from "../../../generated/graphql";

interface props {
  token: string,
}

export default ({ token }: props) => {
  const { data, loading, fetchMore } = useSelectRoomsQuery({
    variables: {
      first: 10,
      skip: 0,
    },
    fetchPolicy: "cache-first",
  });
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <HomePresenter
      data={data as any}
    />
  );
};