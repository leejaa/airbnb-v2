import React, { useState, useEffect, useMemo, useCallback } from "react";
import SearchMapPresenter from "./SearchMapPresenter";
import _ from "lodash";
import { useSelector } from "react-redux";
import { rootState } from "../../../redux/rootReducer";
import { SCREEN_WIDTH } from "../../../utils";


interface props {
}
export default ({ }: props) => {
  const { roomList = [] } = useSelector((state: rootState) => state.homeReducer);
  const [focusedRoomIndex, setFocusedRoomIndex] = useState(0);
  const adjustmentRate = useMemo(() => 0.8, []);
  const onScrollEndDrag = useCallback((data) => {
    let x = data?.nativeEvent?.contentOffset?.x ?? 1;
    x = x === 0 ? 1 : x;
    const intervalWidth = Math.round(SCREEN_WIDTH * adjustmentRate);
    const page = Math.abs(Math.round(x / intervalWidth));
    setFocusedRoomIndex(page);
  }, []);
  return (
    <SearchMapPresenter
      roomList={roomList}
      focusedRoomIndex={focusedRoomIndex}
      adjustmentRate={adjustmentRate}
      onScrollEndDrag={onScrollEndDrag}
    />
  );
};