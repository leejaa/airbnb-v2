import React, { useCallback, useState, useEffect } from "react";
import _ from "lodash";
import { addGuestProps, PlusMinusInputProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined, CloseCircleFilled, InstagramOutlined, LeftOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowHeader, toggleAddGuest, changeGuestInfo } from "../../redux/indexSlice";
import { rootState } from "../../redux/rootReducer";

const PlusMinusInput: React.FunctionComponent<PlusMinusInputProps> = ({
    labelText = "성인",
    descryptionText = "만 13세 이상",
    keyword = ""
}) => {
    const { guestInfo } = useSelector((state: rootState) => state.indexReducer);
    const dispatch = useDispatch();
    const [adultCnt, setAdultCnt] = useState(0);
    const changeAdultCnt = useCallback((plusMinus) => {
        let newAdultCnt = _.clone(adultCnt);
        if (_.isEqual(plusMinus, 'plus')) {
            newAdultCnt++;
        } else if (_.isEqual(plusMinus, 'minus')) {
            newAdultCnt = newAdultCnt - 1 < 0 ? 0 : newAdultCnt - 1;
        }
        setAdultCnt(newAdultCnt);
    }, [adultCnt]);
    useEffect(() => {
        if (!_.isEmpty(guestInfo)) {
            const newGuestInfo = _.clone(guestInfo);
            newGuestInfo[keyword] = adultCnt;
            dispatch(changeGuestInfo({ data: newGuestInfo }));
        }
    }, [adultCnt]);
    return (
        <div className="w-full h-56 mt-5 flex justify-center items-center">
            <div className="w-1/3 h-full flex flex-col justify-center">
                <span className="font-semibold">{labelText}</span>
                <span className="text-gray-500">{descryptionText}</span>
            </div>
            <div className="w-1/3 h-full flex items-center justify-between">
                <MinusCircleOutlined style={{ fontSize: 30 }} onClick={() => changeAdultCnt('minus')} />
                <span className="text-lg">{adultCnt}</span>
                <PlusCircleOutlined style={{ fontSize: 30 }} onClick={() => changeAdultCnt('plus')} />
            </div>
        </div>
    );
}

export default PlusMinusInput;