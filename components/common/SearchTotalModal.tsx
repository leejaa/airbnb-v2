import React, { useCallback, useState } from "react";
import { InputProps, SearchProps, SearchPlaceProps, SearchTotalModalProps } from "../types";
import { CloseOutlined } from "@ant-design/icons";

const SearchTotalModal: React.FunctionComponent<SearchTotalModalProps> = ({
}) => {

    return (
        <div className="border border-black w-9/12 h-90p flex flex-col">
            <div className="w-full h-8 flex justify-end items-center">
                <CloseOutlined style={{ fontSize: 15 }} />
            </div>
            <div className="w-1/13 h-10 flex justify-between items-center">
                <div className="h-80p cursor-pointer">
                    <span className="text-lg hover:text-gray-600">숙소</span>
                </div>
                <div className="h-80p cursor-pointer">
                    <span className="text-lg hover:text-gray-600">체험</span>
                </div>
            </div>
        </div>
    );
}

export default SearchTotalModal;