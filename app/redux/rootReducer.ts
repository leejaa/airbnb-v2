import { combineReducers } from "redux";
import usersReducer, { usersReducerType } from "./usersSlice";
import roomsReducer from "./roomsSlice";
import homeReducer, { homeReducerType } from "./homeSlice";

export interface rootState {
  usersReducer: usersReducerType,
  homeReducer: homeReducerType
}

export default combineReducers({
  usersReducer,
  homeReducer
});