import { createSlice } from "@reduxjs/toolkit";
import { State } from "react-native-gesture-handler";
import axios from "axios";
import { GOOGLE_CLIENT_ID } from "../env";
import _ from "lodash";

export type homeReducerType = {
  showSearchModal: boolean,
  searchPlaceList: Array<any>,
  selectedSearchPlace: string,
  selectedSearchDates: Array<any>,
  personCnt: Object,
  showLikeModal: boolean,
  modalMessage: string,
  searchReviewText: string,
  searchedPlaceWord: string,
  roomList: Array<any>,
}
let initialState: homeReducerType = {
  showSearchModal: false,
  searchPlaceList: [],
  selectedSearchPlace: "",
  selectedSearchDates: [],
  personCnt: {
    adultCnt: 0,
    childCnt: 0,
    babyCnt: 0
  },
  showLikeModal: false,
  modalMessage: "",
  searchReviewText: "",
  searchedPlaceWord: "",
  roomList: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    toggleShowSearchModal(state, action) {
      state.showSearchModal = action.payload.data;
    },
    setSearchPlaceList(state, action) {
      state.searchPlaceList = action.payload.data;
    },
    setSelectedSearchPlace(state, action) {
      state.selectedSearchPlace = action.payload.data;
    },
    setSelectedSearchDates(state, action) {
      state.selectedSearchDates = action.payload.data;
    },
    setPersonCnt(state, action) {
      state.personCnt = action.payload.data;
    },
    toggleSearchReviewText(state, action) {
      state.searchReviewText = action.payload.data;
    },
    toggleShowLikeModal(state, action) {
      state.showLikeModal = action.payload.data;
      state.modalMessage = action.payload.message;
    },
    setSearchedPlaceWord(state, action) {
      state.searchedPlaceWord = action.payload.data;
    },
    setRoomList(state, action) {
      console.log('test', JSON.stringify(action.payload.data) );
      state.roomList = action.payload.data;
    }
  }
});

export const getPlaceInfoList = async ({ searchedPlaceWord, dispatch } : any) => {
  const selectRooms = [];
  let room : any = {};
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchedPlaceWord}+카페&key=${GOOGLE_CLIENT_ID}`;
  let result = await axios.get(url, {
  });
  let placeList = result?.data?.results ?? [];
  if (!_.isEmpty(placeList)) {
    for (const place of placeList.slice(0, 5)) {
      url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,formatted_phone_number,photos&key=${GOOGLE_CLIENT_ID}`;
      result = await axios.get(url, {
      });
      room = {
        id: place.id,
        name: place.name,
        address: place.formatted_address,
        country: "한국",
        description: place.formatted_address,
        lat: place?.geometry?.location?.lat ?? 0,
        lng: place?.geometry?.location?.lng ?? 0,
        price: place?.user_ratings_total ?? 0,
        photo: [],
        score: place?.rating ?? 0,
        __typename: "Room",
      };
      const photoreferences = _.map(result?.data?.result?.photos ?? [], item => item.photo_reference);
      let photoIndex = 0;
      for (const photoreference of photoreferences.slice(0, 3)) {
        url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=${GOOGLE_CLIENT_ID}`;
        result = await axios.get(url, {
        });
        room.photo.push({
          id: photoIndex++,
          file: result?.config?.url ?? "",
          __typename: "Photo",
        });
      }
      selectRooms.push(room);
    }
  }
  const data = { selectRooms };
  dispatch(setRoomList({ data }));
  return data;
}

export const { toggleShowSearchModal, setSearchPlaceList, setSelectedSearchPlace, setSelectedSearchDates, setPersonCnt, toggleShowLikeModal, toggleSearchReviewText,
setSearchedPlaceWord, setRoomList } = homeSlice.actions;

export default homeSlice.reducer;