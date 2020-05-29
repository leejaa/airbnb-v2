import React, { useCallback, useState } from "react";
import { InputProps, SearchProps, SearchPlaceProps, SearchPlaceListProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined, CloseCircleFilled, InstagramOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toggleShowSearchModal, toggleShowSearchPlace, toggleShowHeader } from "../../redux/indexSlice";
import Input from "./Input";

const SearchPlaceList: React.FunctionComponent<SearchPlaceListProps> = ({
    searchResultList = [],
    width = "w-full",
    height = "h-16",
}) => {
    return (
        <div className={`${width} h-full`}>
            {
                searchResultList.slice(0, 4).map(result => (
                    <div className={`w-full ${height} flex flex-row items-center cursor-pointer hover:bg-gray-100`}>
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