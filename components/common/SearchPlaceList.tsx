import React, { useCallback, useState } from "react";
import { InputProps, SearchProps, SearchPlaceProps, SearchPlaceListProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined, CloseCircleFilled, InstagramOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toggleShowSearchModal, toggleShowSearchPlace, toggleShowHeader, toggleShowSearchTotalModal } from "../../redux/indexSlice";
import Input from "./Input";
import { useRouter } from "next/router";
import { rootState } from "../../redux/rootReducer";

const SearchPlaceList: React.FunctionComponent<SearchPlaceListProps> = ({
    searchResultList = [],
    width = "w-full",
    height = "h-16",
    maxCnt = 10,
}) => {
    const { searchPlaceText = "" } = useSelector((state: rootState) => state.indexReducer);
    const dispatch = useDispatch();
    const router = useRouter();
    const selectPlace = useCallback(() => {
        dispatch(toggleShowSearchTotalModal({data: false}));
        router.push({
            pathname: '/search',
            query: {
                keyword: searchPlaceText
            }
        });
    }, [searchPlaceText]);
    return (
        <div className={`${width} h-full`}>
            {
                searchResultList.slice(0, maxCnt).map(result => (
                    <div className={`w-full ${height} flex flex-row items-center cursor-pointer hover:bg-gray-100`} onClick={() => selectPlace()}>
                        <div className="w-14p h-50p rounded-md bg-235 flex items-center justify-center">
                            <InstagramOutlined style={{ fontSize: 23 }} />
                        </div>
                        <div className="w-4/5 h-full flex justify-center items-center">
                            <span>{result?.address_name ?? ''}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default SearchPlaceList;