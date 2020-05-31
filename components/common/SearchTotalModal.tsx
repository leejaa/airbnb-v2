import React, { useCallback, useState, useMemo } from "react";
import axios from "axios";
import { InputProps, SearchProps, SearchPlaceProps, SearchTotalModalProps } from "../types";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowHeader, toggleShowSearchTotalModal, toggleSearchTotalModalIndex, changeSelectedDateRange } from "../../redux/indexSlice";
import Button from "./Button";
import { rootState } from "../../redux/rootReducer";
import Input from "./Input";
import SearchPlaceList from "./SearchPlaceList";
import Calendar from "./Calendar";
import _ from "lodash";
import moment from "moment";

const SearchTotalModal: React.FunctionComponent<SearchTotalModalProps> = ({
}) => {
    const { searchTotalModalIndex = 1, selectedDateRange } = useSelector((state: rootState) => state.indexReducer);
    const dispatch = useDispatch();
    const goBack = useCallback(() => {
        dispatch(toggleShowHeader({ data: true }));
        dispatch(toggleShowSearchTotalModal({ data: false }));
    }, []);
    const [searchPlace, setSearchPlace] = useState("");
    const [searchResultList, setSearchResultList] = useState([]);
    const onChangeSearchPlace = useCallback((e) => {
        setSearchPlace(e?.target?.value ?? '');
        searchAddress();
    }, [searchPlace, searchResultList]);
    const searchAddress = useCallback(async () => {
        const result = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchPlace}`, {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_KEY}`
            }
        });
        setSearchResultList(result?.data?.documents ?? []);
    }, [searchPlace, searchResultList]);
    const selectedDateText = useMemo(() => {
        let selectedDateText = "";
        if (!_.isEmpty(selectedDateRange) && !_.isEmpty(selectedDateRange?.startDate) && !_.isEmpty(selectedDateRange?.endDate)) {
            selectedDateText = `${moment(selectedDateRange.startDate).format('M월 D일')} ~ ${moment(selectedDateRange.endDate).format('M월 D일')}`;
        }
        return selectedDateText;
    }, [selectedDateRange]);
    return (
        <div className="absolute w-full h-80p bottom-0 flex items-center justify-center">
            <div className="w-9/12 h-90p flex flex-col">
                <div className="w-full h-8 flex justify-end items-center cursor-pointer" onClick={goBack}>
                    <CloseOutlined style={{ fontSize: 15 }} />
                </div>
                <div className="w-1/13 h-10 flex justify-between items-center">
                    <div className="h-80p cursor-pointer border-b-2 border-black">
                        <span className="text-lg hover:text-gray-600">숙소</span>
                    </div>
                    <div className="h-80p cursor-pointer">
                        <span className="text-lg hover:text-gray-600">체험</span>
                    </div>
                </div>
                <div className="border border-gray-300 w-full h-20 mt-3 rounded-lg shadow-lg flex flex-row">
                    <div className={`border-2 w-30 h-full flex items-center rounded-lg ${searchTotalModalIndex === 1 ? "border-black bg-gray-100" : "border-gray-100 hover:border-gray-400"}`} onClick={() => dispatch(toggleSearchTotalModalIndex({ data: 1 }))}>
                        <Input
                            inputType="005"
                            placeholder="어디로 여행가세요?"
                            labelText="위치"
                            value={searchPlace}
                            setValue={setSearchPlace}
                            onChange={onChangeSearchPlace}
                            inputBackgroundColor={searchTotalModalIndex === 1 ? "bg-gray-100" : "bg-white"}
                        />
                    </div>
                    <div className={`border-2 w-30 h-full rounded-lg flex justify-content items-center ${searchTotalModalIndex === 2 ? "border-black" : "border-gray-100 hover:border-gray-400"}`} onClick={() => dispatch(toggleSearchTotalModalIndex({ data: 2 }))}>
                        <Input
                            inputType="005"
                            placeholder="날짜 추가"
                            labelText="체크인/체크아웃"
                            value={selectedDateText}
                            setValue={() => dispatch(changeSelectedDateRange({ data: {startDate: null, endDate: null} }))}
                            inputBackgroundColor={searchTotalModalIndex === 1 ? "bg-gray-100" : "bg-white"}
                            inputDisable={true}
                            isInputTextBold={true}
                        />
                    </div>
                    <div className={`border-2 w-30 h-full rounded-lg ${searchTotalModalIndex === 3 ? "border-black" : "border-gray-100 hover:border-gray-400"}`} onClick={() => dispatch(toggleSearchTotalModalIndex({ data: 3 }))}>

                    </div>
                    <div className="w-10p h-full flex items-center justify-center">
                        <Button
                            buttonColor="bg-230"
                            buttonText="검색"
                            showIcon={true}
                        />
                    </div>
                </div>
                {
                    searchTotalModalIndex === 1 && (
                        <div className="w-full h-70p border border-black p-3">
                            <SearchPlaceList
                                searchResultList={searchResultList}
                                width="w-30"
                                height="h-25p"
                                maxCnt={4}
                            />
                        </div>
                    )
                }
                {
                    searchTotalModalIndex === 2 && (
                        <div className="w-full h-70p border border-black p-3 flex justify-center items-center">
                            <Calendar
                                calenderType="002"
                                monthPageSize={3}
                            />
                        </div>
                    )
                }
            </div>

        </div>
    );
}

export default SearchTotalModal;