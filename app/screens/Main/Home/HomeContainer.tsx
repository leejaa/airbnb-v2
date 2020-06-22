import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, ActivityIndicator, View } from "react-native";
import HomePresenter from "./HomePresenter";
import { useSelectPhotoQuery, useSelectRoomsQuery } from "../../../generated/graphql";
import _ from "lodash";

interface props {
  token: string,
}
const pageSize = 5;
export default ({ token }: props) => {
  const [skip, setSkip] = useState(0);
  const { data = [], loading = false, fetchMore, networkStatus } = useSelectRoomsQuery({
    variables: {
      first: pageSize,
      skip: 0
    },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  if (_.isEmpty(data)) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <HomePresenter
      data={data as any}
      fetchMore={fetchMore}
      pageSize={pageSize}
      skip={skip}
      loading={loading}
    />
  );
};