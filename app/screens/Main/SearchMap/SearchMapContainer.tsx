import React, { useState, useEffect, useMemo } from "react";
import SearchMapPresenter from "./SearchMapPresenter";
import _ from "lodash";
import { useSelector } from "react-redux";
import { rootState } from "../../../redux/rootReducer";


interface props {
}
export default ({ }: props) => {
  const { roomList = [] } = useSelector((state: rootState) => state.homeReducer);
  const [focusedRoomIndex, setFocusedRoomIndex] = useState(0);
  return (
    <SearchMapPresenter
      roomList={roomList}
      focusedRoomIndex={focusedRoomIndex}
    />
  );
};