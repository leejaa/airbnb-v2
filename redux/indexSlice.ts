import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export type indexReducerType = {
  test: boolean,
  showJoinModal: boolean,
  showLoginModal: boolean,
  showSearchModal: boolean,
  showHeader: boolean,
  showSearchPlace: boolean,
  showSearchCalendar: boolean,
  showAddGuest: boolean,
  showSearchTotalModal: boolean,
  searchTotalModalIndex: number,
  isLogin: boolean,
  selectedDateRange: {
    startDate: string,
    endDate: string,
  },
  guestInfo: {
    adultCnt: number,
    childCnt: number,
    babyCnt: number,
  },
}
let initialState : indexReducerType = {
  test: false,
  showJoinModal: false,
  showLoginModal: false,
  showSearchModal: false,
  showHeader: true,
  showSearchPlace: false,
  showSearchCalendar: false,
  showAddGuest: false,
  showSearchTotalModal: false,
  searchTotalModalIndex: 1,
  isLogin: false,
  selectedDateRange: {startDate: null, endDate: null},
  guestInfo: {
    adultCnt: 0,
    childCnt: 0,
    babyCnt: 0,
  },
};

const indexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {
    changeTest(state, action) {
      state.test = true;
    },
    toggleShowJoinModal(state, action) {
      state.showJoinModal = action.payload.data ? action.payload.data : !state.showJoinModal;
    },
    toggleShowLoginModal(state, action) {
      state.showLoginModal = action.payload.data ? action.payload.data : !state.showLoginModal;
    },
    toggleShowSearchModal(state, action) {
      state.showSearchModal = action.payload.data ? action.payload.data : !state.showSearchModal;
    },
    toggleShowHeader(state, action) {
      state.showHeader = action.payload.data ? action.payload.data : !state.showHeader;
    },
    toggleShowSearchPlace(state, action) {
      state.showSearchPlace = action.payload.data ? action.payload.data : !state.showSearchPlace;
    },
    toggleShowSearchCalendar(state, action) {
      state.showSearchCalendar = action.payload.data ? action.payload.data : !state.showSearchCalendar;
    },
    toggleIsLogin(state, action) {
      state.isLogin = action.payload.data;
    },
    toggleAddGuest(state, action) {
      state.showAddGuest = action.payload.data;
    },
    toggleShowSearchTotalModal(state, action) {
      state.showSearchTotalModal = action.payload.data;
      state.searchTotalModalIndex = action.payload.searchTotalModalIndex;
    },
    toggleSearchTotalModalIndex(state, action) {
      state.searchTotalModalIndex = action.payload.data;
    },
    changeSelectedDateRange(state, action) {
      state.selectedDateRange = action.payload.data;
    },
    changeGuestInfo(state, action) {
      state.guestInfo = action.payload.data;
    },
  }
});

export const { changeTest, toggleShowJoinModal, toggleShowLoginModal, toggleIsLogin, toggleShowSearchModal, toggleShowHeader, toggleShowSearchPlace, toggleShowSearchCalendar,
  changeSelectedDateRange, toggleAddGuest, toggleShowSearchTotalModal, toggleSearchTotalModalIndex, changeGuestInfo,
} = indexSlice.actions;

export default indexSlice.reducer;