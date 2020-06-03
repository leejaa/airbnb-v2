import React, { useCallback, useState, useMemo } from "react";
import axios from "axios";
import { InputProps, SearchProps, SearchPlaceProps, SearchTotalModalProps } from "../types";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowHeader, toggleShowSearchTotalModal, toggleSearchTotalModalIndex, changeSelectedDateRange, changeGuestInfo } from "../../redux/indexSlice";
import Button from "./Button";
import { rootState } from "../../redux/rootReducer";
import Input from "./Input";
import SearchPlaceList from "./SearchPlaceList";
import Calendar from "./Calendar";
import _ from "lodash";
import moment from "moment";
import PlusMinusInput from "./PlusMinusInput";

const SearchTotalModal: React.FunctionComponent<SearchTotalModalProps> = ({
}) => {
    const { searchTotalModalIndex = 1, selectedDateRange, guestInfo } = useSelector((state: rootState) => state.indexReducer);
    const guestInfoText = useMemo(() => {
        let guestInfoText = "";
        let guestCnt = 0;
        let babyCnt = 0;
        if (!_.isEqual(guestInfo?.adultCnt ?? 0, 0)) {
            guestCnt += guestInfo.adultCnt;
        }
        if (!_.isEqual(guestInfo?.childCnt ?? 0, 0)) {
            guestCnt += guestInfo.childCnt;
        }
        if (!_.isEqual(guestCnt, 0)) {
            guestInfoText += `게스트 ${guestCnt}명`;
        }
        if (!_.isEqual(guestInfo?.babyCnt ?? 0, 0)) {
            babyCnt += guestInfo?.babyCnt;
        }
        if (!_.isEqual(babyCnt, 0)) {
            guestInfoText += ` 유아 ${babyCnt}명`;
        }
        return guestInfoText
    }, [guestInfo]);
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
                            setValue={() => dispatch(changeSelectedDateRange({ data: { startDate: null, endDate: null } }))}
                            inputBackgroundColor={searchTotalModalIndex === 2 ? "bg-gray-100" : "bg-white"}
                            inputDisable={true}
                            isInputTextBold={true}
                        />
                    </div>
                    <div className={`border-2 w-30 h-full rounded-lg flex items-center ${searchTotalModalIndex === 3 ? "border-black" : "border-gray-100 hover:border-gray-400"}`} onClick={() => dispatch(toggleSearchTotalModalIndex({ data: 3 }))}>
                        <Input
                            inputType="005"
                            placeholder="게스트 추가"
                            labelText="인원"
                            inputBackgroundColor={searchTotalModalIndex === 3 ? "bg-gray-100" : "bg-white"}
                            inputDisable={true}
                            isInputTextBold={true}
                            value={guestInfoText}
                            setValue={() => dispatch(changeGuestInfo({ data: { adultCnt: 0, childCnt: 0, babyCnt: 0 } }))}
                        />
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
                        <div className="w-full h-70p p-3">
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
                        <div className="w-full h-70p p-3 flex justify-center items-center">
                            <Calendar
                                calenderType="002"
                                monthPageSize={3}
                            />
                        </div>
                    )
                }
                {
                    searchTotalModalIndex === 3 && (
                        <div className="w-full h-full p-3 flex justify-center items-center">
                            <div className="w-70p h-40p flex flex justify-center items-center">
                                <div className="border-r border-gray-300 w-1/3 h-full flex items-center">
                                    <PlusMinusInput
                                        labelText="성인"
                                        descryptionText="만 13세 이상"
                                        keyword="adultCnt"
                                    />
                                </div>
                                <div className="border-r border-gray-300 w-1/3 h-full flex items-center">
                                    <PlusMinusInput
                                        labelText="어린이"
                                        descryptionText="2~12세"
                                        keyword="childCnt"
                                    />
                                </div>
                                <div className="w-1/3 h-full flex items-center">
                                    <PlusMinusInput
                                        labelText="유아"
                                        descryptionText="2세 미만"
                                        keyword="babyCnt"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
}

export default SearchTotalModal;