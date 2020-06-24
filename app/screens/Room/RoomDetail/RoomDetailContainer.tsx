import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Keyboard, ActivityIndicator, View } from "react-native";
import RoomDetailPresenter from "./RoomDetailPresenter";
import { useSelectPhotoQuery, useSelectRoomsQuery } from "../../../generated/graphql";
import _ from "lodash";

interface props {
}
export default ({}: props) => {
    const route = useRoute();
  return (
    <RoomDetailPresenter
    />
  );
};