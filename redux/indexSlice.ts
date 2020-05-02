import { createSlice } from "@reduxjs/toolkit";

const indexSlice = createSlice({
  name: "index",
  initialState: {
    test: false,
    showJoinModal: false
  },
  reducers: {
    changeTest(state, action) {
      state.test = true;
    },
    toggleShowJoinModal(state, action) {
      state.showJoinModal = !state.showJoinModal;
    }
  }
});

export const { changeTest, toggleShowJoinModal } = indexSlice.actions;

export default indexSlice.reducer;