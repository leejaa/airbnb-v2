import React, { useCallback, useState } from "react";
import { InputProps, SearchProps, SearchPlaceProps, addGuestProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined, CloseCircleFilled, InstagramOutlined, LeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toggleShowSearchModal, toggleShowSearchPlace, toggleShowHeader, toggleAddGuest } from "../../redux/indexSlice";
import Input from "./Input";

const AddGuest: React.FunctionComponent<addGuestProps> = ({
}) => {
    const dispatch = useDispatch();
    const goBack = useCallback(() => {
        dispatch(toggleShowHeader({ data: true }));
        dispatch(toggleAddGuest({ data: false }));
    }, []);

    return (
        <div className="move001">
            <div className="w-full h-16 flex items-center justify-between p-3">
                <LeftOutlined style={{ fontSize: 25 }} onClick={goBack} />
                <span><u>지우기</u></span>
            </div>
            <div className="w-full h-16 mt-5 flex items-center">
                <span className="font-bold text-2xl">게스트 추가</span>
            </div>
            <div className="w-full h-56 mt-5 flex items-center flex flex-col">
                <div className="w-full h-33p border-b border-gray-300 flex items-center justify-between">
                    <div className="border border-black w-1/3 h-full flex flex-col justify-center">
                        <span className="font-semibold">성인</span>
                        <span className="text-gray-500">만 13세 이상</span>
                    </div>
                    <div className="border border-black w-2/5 h-full">

                    </div>
                </div>
                <div className="w-full h-33p border-b border-gray-300">

                </div>
                <div className="w-full h-33p flex items-center justify-between">
                </div>
            </div>
        </div >
    );
}

export default AddGuest;