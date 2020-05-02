import { createSlice } from "@reduxjs/toolkit";

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
      state.showLoginModal = !state.showLoginModal;
    }
  }
});

export const { changeTest, toggleShowJoinModal, toggleShowLoginModal } = indexSlice.actions;

export default indexSlice.reducer;