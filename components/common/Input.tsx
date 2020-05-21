import React, { useCallback, useMemo } from "react";
import { InputProps } from "../types";
import { MessageOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { toggleShowSearchModal } from "../../redux/indexSlice";


const Input: React.FunctionComponent<InputProps> = ({
    inputType = '001'
}) => {
    const dispatch = useDispatch();
    const Input001 = useMemo(() => {
        return (
            <div className="border border-gray-300 w-full h-70p shadow-lg rounded-lg flex flex-row justify-center items-center" onClick={() => dispatch(toggleShowSearchModal({ data: true }))}>
                <div className="w-2/5 h-full flex flex-row justify-around items-center">
                    <SearchOutlined style={{ fontSize: 20 }} />
                    <span className="text-gray-600">숙소 검색</span>
                </div>
            </div>
        );
    }, []);
    const Input002 = useMemo(() => {
        return (
            <div className="border border-gray-300 w-full h-70p rounded-75 flex flex-row items-center bg-247">
                <div className="w-1/6 h-full flex justify-center items-center">
                    <SearchOutlined style={{ fontSize: 20 }} />
                </div>
                <div className="w-4/6 h-full flex justify-center items-center">
                    <input type="text" placeholder="어디로 여행가세요?" className="w-full h-full focus:outline-none bg-247 placeholder-gray-700"/>
                </div>
            </div>
        );
    }, []);
    let Input;
    switch (inputType) {
        case '001':
            Input = _.clone(Input001);
            break;
        case '002':
            Input = _.clone(Input002);
            break;
        default:
            Input = _.clone(Input001);
            break;
    }
    return (
        <>
            {Input}
        </>
    );
}

export default Input;