import { createSlice } from "@reduxjs/toolkit";

export type homeReducerType = {
  showSearchModal: boolean,
  searchPlaceList: Array<any>,
}
let initialState : homeReducerType = {
  showSearchModal: false,
  searchPlaceList: [],
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
  }
});

export const { toggleShowSearchModal, setSearchPlaceList } = homeSlice.actions;

export default homeSlice.reducer;