import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    test: false
  },
  reducers: {
    changeTest(state, action) {
      state.test = true;
    },
  }
});

export const { changeTest } = userSlice.actions;

export const userLogin = form => async dispatch => {
    dispatch(changeTest({}));
  };

export default userSlice.reducer;