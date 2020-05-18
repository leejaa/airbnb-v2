import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, ActivityIndicator, View } from "react-native";
import HomePresenter from "./HomePresenter";
import { useSelectPhotoQuery } from "../../../generated/graphql";

interface props {
  token: string,
}

export default ({ token }: props) => {
  const { data, loading } = useSelectPhotoQuery();
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <HomePresenter
      data={data}
    />
  );
};