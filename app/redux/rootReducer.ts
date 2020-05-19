import { combineReducers } from "redux";
import usersReducer, { usersReducerType } from "./usersSlice";
import roomsReducer from "./roomsSlice";

export interface rootState {
  usersReducer: usersReducerType
}

export default combineReducers({
  usersReducer,
});