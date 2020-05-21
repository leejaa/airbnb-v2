import React, { useCallback } from "react";
import { InputProps, SearchProps, SearchPlaceProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleShowSearchModal, toggleShowSearchPlace, toggleShowHeader } from "../../redux/indexSlice";
import Input from "./Input";

const SearchPlace: React.FunctionComponent<SearchPlaceProps> = ({
}) => {
    const dispatch = useDispatch();
    const cancel = useCallback(() => {
        dispatch(toggleShowSearchPlace({data: false}));
        dispatch(toggleShowHeader({data: true}));
    }, []);
    return (
        <div className="w-full h-full p-5">
            <div className="w-full h-16 flex flex-row">
                <div className="w-4/5 h-full flex justify-center items-center">
                    <Input
                        inputType="002"
                    />
                </div>
                <div className="w-1/5 h-full flex justify-center items-center" onClick={cancel}>
                    <span>취소</span>
                </div>
            </div>
        </div >
    );
}

export default SearchPlace;