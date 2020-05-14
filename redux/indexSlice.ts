import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export type indexReducerType = {
  test: boolean,
  showJoinModal: boolean,
  showLoginModal: boolean,
  isLogin: boolean,
}
let initialState : indexReducerType = {
  test: false,
  showJoinModal: false,
  showLoginModal: false,
  isLogin: false,
};

const indexSlice = createSlice({
  name: "index",
  initialState,
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
    },
    toggleIsLogin(state, action) {
      state.isLogin = action.payload.data;
    }
  }
});

export const { changeTest, toggleShowJoinModal, toggleShowLoginModal, toggleIsLogin } = indexSlice.actions;

export default indexSlice.reducer;