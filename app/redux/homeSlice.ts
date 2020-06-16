import { createSlice } from "@reduxjs/toolkit";
import { setFavs, setFav } from "./roomsSlice";
import { State } from "react-native-gesture-handler";

export type homeReducerType = {
  showSearchModal: boolean,
}
let initialState : homeReducerType = {
  showSearchModal: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    toggleShowSearchModal(state, action) {
      state.showSearchModal = action.payload.data;
    },
  }
});

export const { toggleShowSearchModal } = homeSlice.actions;

export default homeSlice.reducer;