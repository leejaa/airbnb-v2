import { combineReducers } from "redux";
import indexReducer, { indexReducerType } from "./indexSlice";
import roomReducer, { roomReducerType } from "./roomSlice";

export interface rootState {
  indexReducer: indexReducerType,
  roomReducer: roomReducerType,
}

export default combineReducers({
  indexReducer,
  roomReducer,
});