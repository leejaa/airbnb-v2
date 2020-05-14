import { combineReducers } from "redux";
import indexReducer, { indexReducerType } from "./indexSlice";

export interface rootState {
  indexReducer: indexReducerType
}

export default combineReducers({
  indexReducer,
});