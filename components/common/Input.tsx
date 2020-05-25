import React, { useCallback, useMemo, useState } from "react";
import { InputProps } from "../types";
import { MessageOutlined, SearchOutlined, CloseCircleOutlined, CloseCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { toggleShowSearchModal } from "../../redux/indexSlice";


const Input: React.FunctionComponent<InputProps> = ({
    inputType = '001',
    value,
    setValue,
    onChange,
    onKeyDown,
    searchResultList,
    placeholder = "어디로 여행가세요?",
}) => {
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);
    const clear = useCallback(() => {
        setValue("");
    }, [value]);
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
                    <input type="text" placeholder={placeholder} className="w-full h-full focus:outline-none bg-247 placeholder-gray-700"
                        value={value} onChange={onChange} onKeyDown={onKeyDown}
                    />
                </div>
                {
                    value !== "" && (
                        <div className="w-1/6 h-full flex justify-center items-center" onClick={clear}>
                            <CloseCircleFilled style={{ fontSize: 18, color: 'rgb(135, 135, 135)' }} />
                        </div>

                    )
                }
            </div>
        );
    }, [value]);
    const Input003 = useMemo(() => {
        return (
            <div className="w-full h-full flex flex-row items-center">
                <div className={`w-full h-full flex justify-center items-center ${isFocused && "border-b-2 border-black"}`}>
                    <input type="text" placeholder={placeholder} className="w-full h-full focus:outline-none"
                        value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
                    />
                </div>
            </div>
        );
    }, [value, isFocused]);
    let Input;
    switch (inputType) {
        case '001':
            Input = _.clone(Input001);
            break;
        case '002':
            Input = _.clone(Input002);
            break;
        case '003':
            Input = _.clone(Input003);
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