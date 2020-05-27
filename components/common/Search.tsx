import React, { useCallback } from "react";
import { InputProps, SearchProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleShowSearchModal, toggleShowSearchPlace, toggleShowHeader, toggleShowSearchCalendar, toggleAddGuest } from "../../redux/indexSlice";

const Search: React.FunctionComponent<SearchProps> = ({
}) => {
    const dispatch = useDispatch();
    const onClickTrip = useCallback(() => {
        dispatch(toggleShowHeader({data: false}));
        dispatch(toggleShowSearchPlace({data: true}));
    }, []);
    const onClickCalendar = useCallback(() => {
        dispatch(toggleShowHeader({data: false}));
        dispatch(toggleShowSearchCalendar({data: true}));
    }, []);
    const onClickGuest = useCallback(() => {
        dispatch(toggleShowHeader({data: false}));
        dispatch(toggleAddGuest({data: true}));
    }, []);
    return (
        <div className="w-full h-full">
            <div className="w-full h-30p flex justify-center items-center relative">
                <div className="absolute w-1/12 h-full flex justify-center items-center left-0" onClick={() => dispatch(toggleShowSearchModal({data: false}))}>
                    <CloseOutlined style={{ fontSize: 15 }} />
                </div>
                <span className="text-lg">숙소</span>
            </div>
            <div className="border border-gray-300 shadow-lg w-full h-65p rounded-75">
                <div className="border-b border-gray-300 w-full h-50p flex flex-row items-center pl-4" onClick={onClickTrip}>
                    <SearchOutlined style={{ fontSize: 15 }} />
                    <span className="text-base ml-3 text-rgb-113">어디로 여행가세요?</span>
                </div>
                <div className="w-full h-50p flex flex-row">
                    <div className="w-1/2 h-full border-r border-gray-300 relative flex flex-row items-center pl-4" onClick={onClickCalendar}>
                        <CalendarOutlined style={{ fontSize: 15 }} />
                        <span className="text-base ml-3 text-rgb-113">날짜 추가</span>
                    </div>
                    <div className="w-1/2 h-full relative flex flex-row items-center pl-4" onClick={onClickGuest}>
                        <UsergroupAddOutlined style={{ fontSize: 15 }} />
                        <span className="text-base ml-3 text-rgb-113">게스트 추가</span>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Search;