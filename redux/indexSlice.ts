import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const indexSlice = createSlice({
  name: "index",
  initialState: {
    test: false,
    showJoinModal: false,
    showLoginModal: false,
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    changeTest(state, action) {
      state.test = true;
    },
    toggleShowJoinModal(state, action) {
      state.showJoinModal = !state.showJoinModal;
    },
    toggleShowLoginModal(state, action) {
      if ( _.isEmpty(action.payload.data) ) {
        state.showLoginModal = !state.showLoginModal;
      } else {
        state.showLoginModal = action.payload.data;
      }
    }
  }
});

export const { changeTest, toggleShowJoinModal, toggleShowLoginModal } = indexSlice.actions;

export default indexSlice.reducer;