import { createSlice } from "@reduxjs/toolkit";
import { State } from "react-native-gesture-handler";

export type homeReducerType = {
  showSearchModal: boolean,
  searchPlaceList: Array<any>,
  selectedSearchPlace: string,
  selectedSearchDates: Array<any>,
  personCnt: Object,
}
let initialState : homeReducerType = {
  showSearchModal: false,
  searchPlaceList: [],
  selectedSearchPlace: "",
  selectedSearchDates: [],
  personCnt: {
    adultCnt: 0,
    childCnt: 0,
    babyCnt: 0
  }
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    toggleShowSearchModal(state, action) {
      state.showSearchModal = action.payload.data;
    },
    setSearchPlaceList(state, action) {
      state.searchPlaceList = action.payload.data;
    },
    setSelectedSearchPlace(state, action) {
      state.selectedSearchPlace = action.payload.data;
    },
    setSelectedSearchDates(state, action) {
      state.selectedSearchDates = action.payload.data;
    },
    setPersonCnt(state, action) {
      state.personCnt = action.payload.data;
    },
  }
});

export const { toggleShowSearchModal, setSearchPlaceList, setSelectedSearchPlace, setSelectedSearchDates, setPersonCnt } = homeSlice.actions;

export default homeSlice.reducer;