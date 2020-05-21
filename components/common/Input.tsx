import React, { useCallback } from "react";
import { InputProps } from "../types";
import { MessageOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleShowSearchModal } from "../../redux/indexSlice";


const Input: React.FunctionComponent<InputProps> = ({
}) => {
    const dispatch = useDispatch();
    return (
        <div className="border border-gray-300 w-full h-70p shadow-lg rounded-lg flex flex-row justify-center items-center" onClick={() => dispatch(toggleShowSearchModal({data: true}))}>
            <div className="w-2/5 h-full flex flex-row justify-around items-center">
                <SearchOutlined style={{ fontSize: 20 }} />
                <span className="text-gray-600">숙소 검색</span>
            </div>
        </div >
    );
}

export default Input;