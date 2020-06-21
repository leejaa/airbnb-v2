import { createSlice } from "@reduxjs/toolkit";
import { State } from "react-native-gesture-handler";

export type homeReducerType = {
  showSearchModal: boolean,
  searchPlaceList: Array<any>,
  selectedSearchPlace: string,
}
let initialState : homeReducerType = {
  showSearchModal: false,
  searchPlaceList: [],
  selectedSearchPlace: "",
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
  }
});

export const { toggleShowSearchModal, setSearchPlaceList, setSelectedSearchPlace } = homeSlice.actions;

export default homeSlice.reducer;