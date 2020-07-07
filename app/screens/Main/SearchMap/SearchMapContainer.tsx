import React, { useState, useEffect, useMemo, useCallback } from "react";
import SearchMapPresenter from "./SearchMapPresenter";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../redux/rootReducer";
import { SCREEN_WIDTH } from "../../../utils";
import { getPlaceInfoList, setGlobalLoading } from "../../../redux/homeSlice";


interface props {
}
export default ({ }: props) => {
  const dispatch = useDispatch();
  const { roomList = [], globalLoading = false } = useSelector((state: rootState) => state.homeReducer);
  const [focusedRoomIndex, setFocusedRoomIndex] = useState(0);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [region, setRegion]: any = useState(null);
  const adjustmentRate = useMemo(() => 0.8, []);
  const onScrollEndDrag = useCallback((data) => {
    let x = data?.nativeEvent?.contentOffset?.x ?? 1;
    x = x === 0 ? 1 : x;
    const intervalWidth = Math.round(SCREEN_WIDTH * adjustmentRate);
    const page = Math.abs(Math.round(x / intervalWidth));
    setFocusedRoomIndex(page);
  }, []);
  const onRegionChange = useCallback((regionData) => {
    if (!showSearchButton) {
      setShowSearchButton(true);
    }
  }, [showSearchButton]);
  const onRegionChangeComplete = useCallback((regionData) => {
    setRegion(regionData);
  }, [showSearchButton]);
  const searchThisArea = useCallback(() => {
    dispatch(setGlobalLoading({data: true}));
    getPlaceInfoList({ dispatch, longitude: region?.longitude ?? 0, latitude: region?.latitude ?? 0, action: "findByLocation" });
  }, [region]);
  const onMapReady = useCallback(() => {
    setShowSearchButton(false);
  }, []);
  return (
    <SearchMapPresenter
      roomList={roomList}
      focusedRoomIndex={focusedRoomIndex}
      adjustmentRate={adjustmentRate}
      onScrollEndDrag={onScrollEndDrag}
      showSearchButton={showSearchButton}
      onRegionChange={onRegionChange}
      onRegionChangeComplete={onRegionChangeComplete}
      searchThisArea={searchThisArea}
      onMapReady={onMapReady}
      globalLoading={globalLoading}
    />
  );
};