import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import axios from "axios";
import { Room } from "../generated/graphql";

export type roomReducerType = {
  roomList: Array<Room>
}
let initialState : roomReducerType = {
  roomList: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomList(state, action) {
      state.roomList = action.payload.data;
    },
  }
});

export const {
  setRoomList,
} = roomSlice.actions;

export default roomSlice.reducer;